import supabase from '../lib/supabaseClient';

export const productsAPI = {
  async fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async fetchProductById(id) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    return { data, error };
  },

  async createProduct(payload) {
    const { data, error } = await supabase.from('products').insert(payload).single();
    return { data, error };
  },

  async updateProduct(id, payload) {
    const { data, error } = await supabase.from('products').update(payload).eq('id', id).single();
    return { data, error };
  },

  async deleteProduct(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    return { error };
  },
};

export const ordersAPI = {
  async fetchOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('id,status,created_at,total_amount')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createOrder(payload) {
    const { data, error } = await supabase.from('orders').insert(payload).single();
    return { data, error };
  },

  async updateOrder(id, payload) {
    const { data, error } = await supabase.from('orders').update(payload).eq('id', id).single();
    return { data, error };
  },

  async deleteOrder(id) {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    return { error };
  },
};

export const profilesAPI = {
  async fetchProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, fullname, role, points, tier')
      .order('id', { ascending: false });
    return { data, error };
  },

  async createCustomer(payload) {
    const { email, password, fullname, role } = payload;
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          fullname,
        },
      },
    });

    if (authError) {
      return { data: null, error: authError };
    }

    const userId = authData?.user?.id;
    if (!userId) {
      return { data: null, error: new Error('Gagal membuat pengguna Supabase.') };
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert({ id: userId, fullname, role })
      .single();

    return { data, error };
  },

  async updateCustomer(id, payload) {
    const { data, error } = await supabase.from('profiles').update(payload).eq('id', id).single();
    return { data, error };
  },

  async deleteCustomer(id) {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    return { error };
  },
};

export default supabase;
