'use server';

import { supabaseClient } from '@/utils/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function getUserId() {
  const { data: userDetails } = await supabaseClient
    .from('users')
    .select('*')
    .single();
  const userId = userDetails ? userDetails.id : '';
  if (!userId) {
    return;
  }
  return userId;
}

export async function createPortfolio(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    image_1: z.string().min(1),
    bio: z.string().min(1),
    cv: z.string().min(1),
    contact: z.string().min(1),
    color_theme_id: z.string().min(1),
    spacing_theme_id: z.string().min(1),
    typography_theme_id: z.string().min(1),
    page_layout: z.string().min(1),
    work_id: z.string().array().min(1).or(z.string().min(1)),
    user_id: z.string().min(1)
  });
  console.log(formData);

  const data = schema.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    bio: formData.get('bio'),
    cv: formData.get('cv'),
    contact: formData.get('contact'),
    page_layout: formData.get('page_layout'),
    user_id: formData.get('user_id'),
    image_1: 'initial',
    spacing_theme_id: formData.get('spacing_theme_id'),
    color_theme_id: formData.get('color_theme_id'),
    typography_theme_id: formData.get('typography_theme_id'),
    work_id: formData.get('work_id')
  });

  const imageFile = formData.get('image_1');
  if (imageFile === null) {
    throw Error;
  }

  data.work_id = data.work_id.toString().split(',');

  // Upload de imagem

  const { data: file, error } = await supabaseClient.storage
    .from('images')
    .upload(`images/image_${Date.now()}.png`, imageFile, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('Erro ao fazer upload da imagem:', error);
  }
  const imageUrl = file
    ? 'https://kwndzieuudlxdvvqoigx.supabase.co/storage/v1/object/public/images/' +
      file.path
    : '';
  data.image_1 = imageUrl;
  console.log(data);

  try {
    const { data: dataOk, error } = await supabaseClient
      .from('portfolio')
      .insert(data)
      .select();

    console.log(dataOk, error);
    if (!dataOk) {
      throw Error;
    }
    revalidatePath(`/dashboard/portfolios/${dataOk[0].id}`);
    redirect(`/dashboard/portfolios`);
  } catch (e) {
    console.log(e);
    return { message: 'Failed to create portfolio' };
  }
}
export async function editPortfolio(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    image_1: z.string().min(1),
    bio: z.string().min(1),
    cv: z.string().min(1),
    contact: z.string().min(1),
    color_theme_id: z.string().min(1),
    spacing_theme_id: z.string().min(1),
    typography_theme_id: z.string().min(1),
    page_layout: z.string().min(1),
    work_id: z.string().array().min(1).or(z.string().min(1)),
    user_id: z.string().min(1)
  });
  console.log(formData);

  const data = schema.parse({
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    bio: formData.get('bio'),
    cv: formData.get('cv'),
    contact: formData.get('contact'),
    page_layout: formData.get('page_layout'),
    user_id: formData.get('user_id'),
    image_1: 'initial',
    spacing_theme_id: formData.get('spacing_theme_id'),
    color_theme_id: formData.get('color_theme_id'),
    typography_theme_id: formData.get('typography_theme_id'),
    work_id: formData.get('work_id')
  });

  const imageFile = formData.get('image_1');
  if (imageFile === null) {
    throw Error;
  }

  data.work_id = data.work_id.toString().split(',');

  // Upload de imagem

  const { data: file, error } = await supabaseClient.storage
    .from('images')
    .upload(`images/image_${Date.now()}.png`, imageFile, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('Erro ao fazer upload da imagem:', error);
  }
  const imageUrl = file
    ? 'https://kwndzieuudlxdvvqoigx.supabase.co/storage/v1/object/public/images/' +
      file.path
    : '';
  data.image_1 = imageUrl;
  console.log(data.work_id);

  try {
    const { data: dataOk, error } = await supabaseClient
      .from('portfolio')
      .update(data)
      .eq('id', data.id);

    console.log(dataOk, error);

    revalidatePath(`/dashboard/portfolios/`);
    redirect(`/`);
  } catch (e) {
    console.log(e);
    return { message: 'Failed to update portfolio' };
  }
}

export async function deletePortfolio(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1)
  });

  const data = schema.parse({
    id: formData.get('id')
  });

  try {
    const { data: dataOk, error } = await supabaseClient
      .from('portfolio')
      .delete()
      .eq('id', data.id);

    revalidatePath(`/dashboard/portfolios/`, 'page');
  } catch (e) {
    console.log(e);
    return { message: 'Failed to delete portfolio' };
  }
}
