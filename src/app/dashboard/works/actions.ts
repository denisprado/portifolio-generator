'use server';

import { getImageSrc } from '../imageActions';
import { PortifolioType, WorkType, imagesFiles, imagesSrcs } from '../types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { z } from 'zod';

export async function createWork(data: WorkType) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { id, ...newData } = data;
  const { data: newWork, error } = await supabase
    .from('work')
    .insert(newData)
    .select()
    .single();
  console.log('newWork', newData, error);
  newWork && newWork.id && redirect(`/dashboard/works/${newWork.id}`);
}
// Define um tipo personalizado para representar arquivos

export async function editWork(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.optional(z.string()),
    title: z.string().nullable(),
    description_1: z.string().nullable(),
    image_1_src: z.string().nullable().optional(),
    image_2_src: z.string().nullable().optional(),
    color_theme_id: z.string().nullable(),
    spacing_theme_id: z.string().nullable(),
    typography_theme_id: z.string().nullable(),
    page_layout: z.string(),

    description_1_order: z.string().nullable(),
    description_2: z.string().nullable(),
    description_2_order: z.string().nullable(),
    image_1_order_image: z.string().nullable(),
    image_1_orientation: z.string().nullable(),
    image_2_order_image: z.string().nullable(),
    image_2_orientation: z.string().nullable(),
    tech_1_order: z.string().nullable(),
    tech_2_order: z.string().nullable(),
    tech_description_1: z.string().nullable(),
    tech_description_2: z.string().nullable(),
    text_1_horizontal_align: z.string().nullable(),
    text_1_vertical_align: z.string().nullable(),
    text_2_horizontal_align: z.string().nullable(),
    text_2_vertical_align: z.string().nullable()
  });

  const data = schema.parse({
    id: formData.get('id') !== 'new' ? formData.get('id') : undefined,
    title: formData.get('title'),
    description_1: formData.get('description_1'),
    description_2: formData.get('description_2'),
    image_1: formData.get('image_1'),
    image_2: formData.get('image_2'),
    spacing_theme_id: formData.get('spacing_theme_id') ?? '',
    color_theme_id: formData.get('color_theme_id') ?? '',
    typography_theme_id: formData.get('typography_theme_id') ?? '',
    page_layout: formData.get('page_layout'),

    description_1_order: formData.get('description_1_order'),
    description_2_order: formData.get('description_2_order'),
    image_1_order_image: formData.get('image_1_order_image'),
    image_1_orientation: formData.get('image_1_orientation'),
    image_2_order_image: formData.get('image_2_order_image'),
    image_2_orientation: formData.get('image_2_orientation'),
    tech_1_order: formData.get('tech_1_order'),
    tech_2_order: formData.get('tech_2_order'),
    tech_description_1: formData.get('tech_description_1'),
    tech_description_2: formData.get('tech_description_2'),
    text_1_horizontal_align: formData.get('text_1_horizontal_align'),
    text_1_vertical_align: formData.get('text_1_vertical_align'),
    text_2_horizontal_align: formData.get('text_2_horizontal_align'),
    text_2_vertical_align: formData.get('text_2_vertical_align')
  });

  data.image_1_src = await getImageSrc(formData, 'image_1');
  data.image_2_src = await getImageSrc(formData, 'image_2');

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: dataOk, error } = await supabase
      .from('work')
      .upsert({ ...data })
      .select()
      .single();

    console.log('editWork', data, error);

    revalidatePath(`/dashboard/works/${formData.get('id')}`, 'page'); // Update cached posts
    return {
      id: dataOk?.id,
      image_1_src: dataOk?.image_1_src,
      image_2_src: dataOk?.image_2_src
    };
  } catch (e) {
    console.log(e);
    return { message: 'Failed to update work' };
  }
}

export async function deleteWork(prevState: any, formData: FormData) {
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
      .from('work')
      .delete()
      .eq('id', data.id);
    console.log(error && 'Error:', error);
    revalidatePath(`/dashboard/works`, 'page');
  } catch (e) {
    console.log(e);
    return { message: 'Failed to delete work' };
  }
}
