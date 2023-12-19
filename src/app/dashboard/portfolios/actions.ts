'use server';

import { PortifolioType, imagesFiles, imagesSrcs } from './types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { z } from 'zod';

export async function create(data: PortifolioType) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { id, ...newData } = data;
  const { data: newPortfolio, error } = await supabase
    .from('portfolio')
    .insert(newData)
    .select()
    .single();
  console.log('newPortfolio', newData, error);
  newPortfolio &&
    newPortfolio.id &&
    redirect(`/dashboard/portfolios/${newPortfolio.id}`);
}
// Define um tipo personalizado para representar arquivos

export async function editPortfolio(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.optional(z.string()),
    title: z.string().nullable(),
    description: z.string().nullable(),
    image_1_src: z.string().nullable().optional(),
    image_2_src: z.string().nullable().optional(),
    bio: z.string().nullable(),
    cv: z.string().nullable(),
    contact: z.string().nullable(),
    color_theme_id: z.string().nullable(),
    spacing_theme_id: z.string().nullable(),
    typography_theme_id: z.string().nullable(),
    page_layout: z.string(),
    work_id: z.string().array().nullable().optional().or(z.string())
  });
  const rawWorkId = formData.get('work_id');
  console.log(rawWorkId);
  let workId =
    typeof rawWorkId === 'string'
      ? rawWorkId === 'null'
        ? null
        : rawWorkId && Array(rawWorkId)
      : rawWorkId;

  const data = schema.parse({
    id: formData.get('id') !== 'new' ? formData.get('id') : undefined,
    title: formData.get('title'),
    description: formData.get('description'),
    bio: formData.get('bio'),
    cv: formData.get('cv'),
    contact: formData.get('contact'),
    page_layout: formData.get('page_layout'),
    image_1: formData.get('image_1'),
    image_2: formData.get('image_2'),
    spacing_theme_id: formData.get('spacing_theme_id') ?? '',
    color_theme_id: formData.get('color_theme_id') ?? '',
    typography_theme_id: formData.get('typography_theme_id') ?? '',
    work_id: workId
  });

  data.image_1_src = await getImageSrc(formData, 'image_1');
  data.image_2_src = await getImageSrc(formData, 'image_2');

  data.work_id =
    data && data.work_id ? data.work_id.toString().split(',') : null;

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: dataOk, error } = await supabase
      .from('portfolio')
      .upsert({ ...data })
      .select()
      .single();

    console.log('editPortfolio', data, error);

    revalidatePath(`/dashboard/portfolios/${formData.get('id')}`, 'page'); // Update cached posts
    return { id: dataOk?.id };
  } catch (e) {
    console.log(e);
    return { message: 'Failed to update portfolio' };
  }
}

export async function deletePortfolio(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const schema = z.object({
    id: z.string().min(1)
  });

  const data = schema.parse({
    id: formData.get('id')
  });

  try {
    const { data: dataOk, error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', data.id);

    revalidatePath(`/dashboard/portfolios`, 'page');
    const router = useRouter();
    router.refresh();
  } catch (e) {
    console.log(e);
    return { message: 'Failed to delete portfolio' };
  }
}

const getImageSrc = async (formData: FormData, fieldName: imagesFiles) => {
  const newUploadImage = formData.get(fieldName);
  const oldImageSrc = formData.get(`${fieldName}_src`) as imagesSrcs;

  if (
    newUploadImage === null ||
    newUploadImage === undefined ||
    newUploadImage === ''
  ) {
    return oldImageSrc;
  }

  const uploadImageSrc = async () => await uploadImage(formData, fieldName);
  const newImageSrc = await uploadImageSrc();

  return typeof newImageSrc === 'string' ? newImageSrc : null;
};

async function uploadImage<T extends Blob>(
  formData: FormData,
  label: 'image_1' | 'image_2'
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const imageFile = formData.get(label);
  console.log([typeof imageFile, label, imageFile]);
  if (!imageFile) return '';

  if (!(imageFile instanceof Blob)) {
    console.log(typeof imageFile);
    return '';
  }

  const originalFileName =
    'name' in imageFile ? (imageFile as File).name : 'unknown';

  const { data: file, error } = await supabase.storage
    .from('images')
    .upload(`images/${originalFileName}`, imageFile as unknown as T, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }

  const imageUrl = file
    ? `https://kwndzieuudlxdvvqoigx.supabase.co/storage/v1/object/public/images/${file.path}`
    : '';
  console.log(imageUrl);
  revalidatePath(`/dashboard/portfolios/${formData.get('id')}`, 'page');
  return imageUrl;
}
