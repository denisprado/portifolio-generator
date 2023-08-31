import { supabaseClient } from '@/utils/supabase';
import { supabaseAuthProvider } from 'ra-supabase-core';

export const authProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from('userProfiles')
      .select('id, first_name, last_name')
      .match({ email: user.email })
      .single();

    if (!data || error) {
      throw new Error();
    }

    return {
      id: data.id,
      fullName: `${data.first_name} ${data.last_name}`
    };
  }
});
