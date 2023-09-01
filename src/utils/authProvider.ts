import { supabaseClient } from '@/utils/supabase';
import { supabaseAuthProvider } from 'ra-supabase-core';

export const authProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from('users')
      .select('id, full_name')
      .match({ id: user.id })
      .single();

    if (!data || error) {
      throw new Error();
    }

    return {
      id: data.id,
      fullName: `${data.full_name}`
    };
  }
});
