'use server';

import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { supabaseClient } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createTodo(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    image_1: z.string().min(1),
    bio: z.string().min(1),
    cv: z.string().min(1),
    contact: z.string().min(1),
    user_id: z.string().min(1)
  });

  const [session] = await Promise.all([getSession()]);
  const user = session?.user;

  const data = schema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    bio: formData.get('bio'),
    cv: formData.get('cv'),
    contact: formData.get('contact'),
    orientation: formData.get('orientation'),
    user_id: user ? user.id : '',
    image_1: 'initial'
  });

  const imageFile = formData.get('image_1');
  if (imageFile === null) {
    throw Error;
  }

  const { data: file, error } = await supabaseClient.storage
    .from('images')
    .upload(`images/image_${Date.now()}.png`, imageFile, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('Erro ao fazer upload da imagem:', error);
  }
  // Obtenha a URL da imagem carregada
  const imageUrl = file ? file.path : '';
  data.image_1 = imageUrl;
  console.log(data);
  try {
    const { data: dataOk, error } = await supabaseClient
      .from('portfolio')
      .insert(data)
      .select();

    console.log(dataOk, error);
    revalidatePath('/');
    return { message: `Added portfolio ${data.title}` };
  } catch (e) {
    console.log(e);
    return { message: 'Failed to create portfolio' };
  }
}
