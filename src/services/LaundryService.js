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

  // --- Orders (The Fix) ---
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        ...orderData,
        system_tag: SYSTEM_TAG,
        weight: parseFloat(orderData.weight) || 0,
        total_price: parseFloat(orderData.total_price) || 0,
        status: 'Received'
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
      .select('id, customer_name, status, service_type, total_price, created_at')
      .eq('id', orderId)
      .eq('system_tag', SYSTEM_TAG)
      .single();
    if (error) throw error;
    return data;
  }
};

// Exporting as a default object to ensure "not a function" errors are impossible
export default laundryService;