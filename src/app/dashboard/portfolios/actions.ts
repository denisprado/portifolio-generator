'use server';

import { PortifolioType } from '@/components/pdf/styles';
import { supabaseServer } from '@/utils/supabase-server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function create(data: PortifolioType) {
  const { id, ...newData } = data;
  const { data: newPortfolio, error } = await supabaseServer
    .from('portfolio')
    .insert(newData)
    .select()
    .single();
  console.log('newPortfolio', newData, error);
  newPortfolio &&
    newPortfolio.id &&
    redirect(`/dashboard/portfolios/addForm/${newPortfolio.id}`);
}

export async function editPortfolio(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.optional(z.string()),
    title: z.string().nullable(),
    description: z.string().nullable(),
    image_1: z.string().nullable(),
    image_2: z.string().nullable(),
    bio: z.string().nullable(),
    cv: z.string().nullable(),
    contact: z.string().nullable(),
    color_theme_id: z.string().nullable(),
    spacing_theme_id: z.string().nullable(),
    typography_theme_id: z.string().nullable(),
    page_layout: z.string(),
    work_id: z.string().array().nullable()
  });
  const rawWorkId = formData.get('work_id');

  let workId =
    typeof rawWorkId === 'string'
      ? rawWorkId === ''
        ? null
        : Array(rawWorkId)
      : rawWorkId;

  const data = schema.parse({
    id: formData.get('id') !== 'new' ? formData.get('id') : undefined,
    title: formData.get('title'),
    description: formData.get('description'),
    bio: formData.get('bio'),
    cv: formData.get('cv'),
    contact: formData.get('contact'),
    page_layout: formData.get('page_layout'),
    image_1: 'initial',
    image_2: 'initial',
    spacing_theme_id:
      formData.get('spacing_theme_id') === ''
        ? null
        : formData.get('spacing_theme_id'),
    color_theme_id:
      formData.get('color_theme_id') === ''
        ? null
        : formData.get('color_theme_id'),
    typography_theme_id:
      formData.get('typography_theme_id') === ''
        ? null
        : formData.get('typography_theme_id'),
    work_id: workId
  });

  const imageFile1 = formData.get('image_1');
  if (imageFile1 === null) {
    throw Error;
  }

  data.work_id =
    data && data.work_id ? data.work_id.toString().split(',') : null;

  // Upload de imagem

  data.image_1 = await uploadImage(formData, 'image_1');
  data.image_2 = await uploadImage(formData, 'image_2');

  try {
    const { data: dataOk, error } = await supabaseServer
      .from('portfolio')
      .upsert({ ...data })
      .select()
      .single();

    console.log('editPortfolio error', error);

    revalidateTag('id'); // Update cached posts
    return { id: dataOk?.id };
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
    const { data: dataOk, error } = await supabaseServer
      .from('portfolio')
      .delete()
      .eq('id', data.id);

    revalidatePath(`/dashboard/portfolios/`, 'page');
  } catch (e) {
    console.log(e);
    return { message: 'Failed to delete portfolio' };
  }
}

export async function getUserId() {
  const { data: userDetails } = await supabaseServer
    .from('users')
    .select('*')
    .single();
  const userId = userDetails ? userDetails.id : '';
  if (!userId) {
    return;
  }
  return userId;
}

async function uploadImage(formData: FormData, label: 'image_1' | 'image_2') {
  const imageFile1 = formData.get(label);
  if (imageFile1 === null) {
    throw Error;
  }

  const { data: file, error } = await supabaseServer.storage
    .from('images')
    .upload(`images/image_${Date.now()}.png`, imageFile1, {
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
  return imageUrl;
}
