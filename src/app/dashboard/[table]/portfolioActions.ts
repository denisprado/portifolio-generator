'use server';

import { getImageSrc } from '../imageActions';
import { PortfolioType } from '../types';
import { PORTFOLIO } from '@/app/constants';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { z } from 'zod';

export async function create(data: PortfolioType) {
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
    redirect(`/dashboard/portfolio/${newPortfolio.id}`);
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

    revalidatePath(`/dashboard/portfolio/${formData.get('id')}`, 'page'); // Update cached posts
    return {
      id: dataOk?.id,
      image_1_src: dataOk?.image_1_src,
      image_2_src: dataOk?.image_2_src
    };
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

    revalidatePath(`/dashboard/portfolio`, 'page');
  } catch (e) {
    console.log(e);
    return { message: 'Failed to delete portfolio' };
  }
}
