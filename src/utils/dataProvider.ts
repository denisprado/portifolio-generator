import { supabaseClient } from './supabase';
import { supabaseDataProvider } from 'ra-supabase-core';
import { useRecordContext, withLifecycleCallbacks } from 'react-admin';
import { v4 as uuidv4 } from 'uuid';

type ImageOriginal = {
  rawFile: File;
  title: string;
};

type ImageParam = {
  imageParam: ImageOriginal;
};

type ImageObject = {
  path: string;
  rawFile: File;
  imageUrl: string;
};

type ImageObjectMap = {
  image: ImageObject;
};

type ImageObjectProps = {
  images: ImageObjectMap[];
};

const dataProvider = withLifecycleCallbacks(
  supabaseDataProvider({
    instanceUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    supabaseClient
  }),
  [
    {
      resource: 'work',
      beforeCreate: async (params: Partial<any>, dataProvider: any) => {
        if (!params || !params.data || !params.data.image_1) {
          throw new Error('params.data.image_1 undefined');
        }

        const imagesArray: ImageOriginal[] = [
          params.data.image_1,
          params.data.image_2!
        ];

        if (imagesArray.length < 1) {
          throw new Error('ImagesArray undefined');
        }

        const images = imagesArray.map((imageOriginal) => {
          console.log('imageParam', imageOriginal);
          return imageOriginal && imageObject(imageOriginal);
        });

        uploadToStorage({ images });

        const newParams = {
          ...params.data,
          image_1: images[0].image.imageUrl,
          image_2: images[1].image.imageUrl!
        }!;

        return dataProvider.create('work', {
          data: {
            ...newParams
          }
        });
      }
    }
  ]
);

export default dataProvider;

// upload das imagens
const uploadToStorage = async ({ images }: ImageObjectProps) => {
  images.map(async ({ image }: ImageObjectMap) => {
    const rawFile = image.rawFile;
    const path = image.path;
    const { data: storageUploadData, error: uploadError } =
      await supabaseClient.storage.from('images').upload(path, rawFile, {
        cacheControl: '3600',
        upsert: false
      });
    return { storageUploadData, uploadError };
  });
  return;
};

// retorn objetos de imagem

const imageObject = ({ rawFile, title }: ImageOriginal): ImageObjectMap => {
  const imageId = uuidv4();

  const path = `images/${imageId}`;
  const imageUrl: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;

  const image: ImageObject = { path, rawFile, imageUrl };
  return { image };
};
