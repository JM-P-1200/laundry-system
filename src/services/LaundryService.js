import { supabase } from './supabaseClient';

const SYSTEM_TAG = 'laundry_v1';

/**
 * LAUNDRY SERVICE (DAO)
 * Architecture: Enforces 3NF compliance and multi-tenant tagging.
 */
const laundryService = {
  // --- Settings ---
  async getSettings() {
    try {
      const { data, error } = await supabase
        .from('shop_settings')
        .select('*')
        .eq('system_tag', SYSTEM_TAG)
        .maybeSingle();

      if (error) {
        console.error("Supabase read error:", error.message);
        return null;
      }
      
      return data;
    } catch (err) {
      console.error("Unhandled service fetch block:", err);
      return null;
    }
  },

  async saveSettings(settings) {
    const cleanPayload = {
      system_tag: SYSTEM_TAG,
      shop_name: settings.shop_name || 'BubbleWorks',
      price_per_kg: parseFloat(settings.price_per_kg) || 2.00,
      currency: settings.currency || '$',
      delivery_fee: parseFloat(settings.delivery_fee) || 5.00,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('shop_settings')
      .upsert(cleanPayload, { onConflict: 'system_tag' })
      .select();
      
    if (error) {
      console.error("Supabase Database Write Error Details:", error);
      throw error;
    }
    return data[0];
  },

  // --- Orders (Legacy Layer Support) ---
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        ...orderData,
        system_tag: SYSTEM_TAG,
        weight: parseFloat(orderData.weight) || 0,
        total_price: parseFloat(orderData.total_price) || 0,
        order_status: 'Received'
      }])
      .select();

    if (error) {
      console.error("RDBMS_INSERT_ERROR:", error.message);
      throw error;
    }
    return data[0];
  },

  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('system_tag', SYSTEM_TAG)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async trackOrder(orderId) {
    const { data, error } = await supabase
      .from('orders')
      .select('id, customer_name, order_status, delivery_type, created_at')
      .eq('id', orderId)
      .eq('system_tag', SYSTEM_TAG)
      .single();
    if (error) throw error;
    return data;
  },

  // --- 🌟 Advanced Relational Queue Operations (Step 2 Expansion) ---
  // Open src/services/laundryService.js and update this method:

  /**
   * Submits a transaction block creating both an Order metadata shell and its relational sub-items
   * @param {Object} masterOrder 
   * @param {Array} itemsList 
   */
  async submitNewOrder(masterOrder, itemsList) {
    try {
      // 🛠️ FIX: Client-side cryptographic ID generation matching the TEXT layout
      // Generates a clean random string (e.g., "b87f4c2d-901a-42cd...")
      const generatedOrderId = crypto.randomUUID();

      // Step A: Insert master order tracking shell with the explicit generated ID string
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          id: generatedOrderId, // 🌟 Handing an explicit unique string identifier to Postgres
          system_tag: SYSTEM_TAG,
          customer_name: masterOrder.customer_name,
          customer_phone: masterOrder.customer_phone,
          delivery_type: masterOrder.delivery_type,
          delivery_address: masterOrder.delivery_address,
          payment_method: masterOrder.payment_method,
          payment_status: masterOrder.payment_status,
          notes: masterOrder.notes,
          order_status: 'Received'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Step B: Map the generated foreign key to individual laundry sub-items
      const localizedItems = itemsList.map(item => ({
        order_id: orderData.id, // Successfully matches our parent identifier string
        service_type: item.service_type,
        weight_kg: parseFloat(item.weight_kg) || 0.00,
        unit_price: parseFloat(item.unit_price) || 0.00
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(localizedItems);

      if (itemsError) throw itemsError;

      return orderData;
    } catch (err) {
      console.error("TRANSACTION_ABORTED:", err.message);
      throw err;
    }
  },

  /**
   * Fetches full operational list for active workshop steps including nested relational items
   */
  async getActiveQueue() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('system_tag', SYSTEM_TAG)
      .neq('order_status', 'Delivered') // Queue excludes completed offloaded logs
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  /**
   * Advances the workflow index status dynamically
   */
  async updateOrderStatus(orderId, nextStatus) {
    const { data, error } = await supabase
      .from('orders')
      .update({ order_status: nextStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select();

    if (error) throw error;
    return data[0];
  }
};

// Exporting as a default object to ensure "not a function" errors are impossible
export default laundryService;