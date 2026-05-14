import { supabase } from './supabaseClient';

const SYSTEM_TAG = 'laundry_v1'; // Logic: Multi-tenant partition key

export const laundryService = {
  /**
   * Fetch Shop Settings
   * @returns {Promise<Object>} The settings row for the current tag.
   */
  async getSettings() {
    const { data, error } = await supabase
      .from('shop_settings')
      .select('*')
      .eq('system_tag', SYSTEM_TAG)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  /**
   * Upsert Shop Settings
   * Logic: Uses system_tag as the conflict target for single-row config.
   */
  async saveSettings(settings) {
    const { data, error } = await supabase
      .from('shop_settings')
      .upsert(
        { ...settings, system_tag: SYSTEM_TAG, updated_at: new Date() },
        { onConflict: 'system_tag' }
      )
      .select();

    if (error) throw error;
    return data[0];
  },

  /**
   * Sync New Order
   * Rationale: Casts strings to DECIMAL-compatible numbers for Postgres.
   */
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        ...orderData,
        system_tag: SYSTEM_TAG,
        weight: parseFloat(orderData.weight) || 0,
        total_price: parseFloat(orderData.total_price) || 0
      }])
      .select();

    if (error) throw error;
    return data[0];
  }
};