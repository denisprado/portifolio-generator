'use server';

import { imagesFiles, imagesSrcs } from './types';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const getImageSrc = async (
  formData: FormData,
  fieldName: imagesFiles
) => {
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
