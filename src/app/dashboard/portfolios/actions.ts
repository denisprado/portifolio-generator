'use server';

import { PortifolioType } from './types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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
type FileValue = {
  file: File;
};

function isFileValue(value: any): value is FileValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    'file' in value &&
    value.file instanceof File
  );
}

export async function editPortfolio(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.optional(z.string()),
    title: z.string().nullable(),
    description: z.string().nullable(),
    image_1: z
      .object({
        file: z.object({
          name: z.string(),
          lastModified: z.number(),
          type: z.string(),
          size: z.number()
        })
      })
      .nullable()
      .optional()
      .refine((value) => isFileValue(value), {
        message: 'Invalid file format for image_1'
      }),
    image_2: z
      .object({
        file: z.object({
          name: z.string(),
          lastModified: z.number(),
          type: z.string(),
          size: z.number()
        })
      })
      .optional()
      .nullable()
      .refine((value) => isFileValue(value), {
        message: 'Invalid file format for image_2'
      }),
    image_1_src: z.string().nullable(),
    image_2_src: z.string().nullable(),
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
    image_1: formData.get('image_1'),
    image_2: formData.get('image_2'),
    image_1_src: await uploadImage(formData, 'image_1'),
    image_2_src: await uploadImage(formData, 'image_2'),
    spacing_theme_id: formData.get('spacing_theme_id') ?? '',
    color_theme_id: formData.get('color_theme_id') ?? '',
    typography_theme_id: formData.get('typography_theme_id') ?? '',
    work_id: workId
  });

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

    console.log('editPortfolio error', data, error);

    revalidateTag('id'); // Update cached posts
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

    revalidatePath(`/dashboard/portfolios`, 'layout');
  } catch (e) {
    console.log(e);
    return { message: 'Failed to delete portfolio' };
  }
}

async function uploadImage<T extends Blob>(
  formData: FormData,
  label: 'image_1' | 'image_2'
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const imageFile = formData.get(label);
  console.log([typeof imageFile, label, imageFile]);
  if (!imageFile) return null;

  if (!(imageFile instanceof Blob)) {
    throw new Error('Invalid file format');
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

  return imageUrl;
}
