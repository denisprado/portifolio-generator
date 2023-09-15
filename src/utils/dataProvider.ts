import { supabaseClient } from './supabase';
import { supabaseDataProvider } from 'ra-supabase-core';
import { useRecordContext, withLifecycleCallbacks } from 'react-admin';
import { v4 as uuidv4 } from 'uuid';

type ImageOriginal = {
  rawFile: File;
  title?: string;
  url?: string;
};

type ImageObject = {
  title: string;
  rawFile: File;
  url: string;
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
        const newParams = await createNewParams(params);

        return dataProvider.create('work', {
          ...params,
          data: {
            ...newParams
          }
        });
      },
      beforeUpdate: async (params: Partial<any>, dataProvider: any) => {
        const newParams = await createNewParams(params);
        return dataProvider.update('work', {
          ...params,
          data: {
            ...newParams
          }
        });
      }
    },
    {
      resource: 'portfolio',
      beforeCreate: async (params: Partial<any>, dataProvider: any) => {
        const newParams = await createNewParams(params);

        return dataProvider.create('portfolio', {
          ...params,
          data: {
            ...newParams
          }
        });
      },
      beforeUpdate: async (params: Partial<any>, dataProvider: any) => {
        const newParams = await createNewParams(params);

        return dataProvider.update('portfolio', {
          ...params,
          data: {
            ...newParams
          }
        });
      }
    }
  ]
);

export default dataProvider;

async function createNewParams(params: Partial<any>) {
  if (!params.data.image_1) {
    return params;
  }
  const imageObject1 = imageObject(params.data.image_1);
  const image1Src = imageObject1 && (await uploadImage(imageObject1));

  const newParams1 = {
    image_1: {
      src: image1Src?.path,
      title: imageObject1?.title,
      file: imageObject1?.rawFile
    },
    image_1_src: imageObject1?.url
  };

  const imageObject2 = imageObject(params.data.image_2);
  const image2Src = imageObject2 && (await uploadImage(imageObject2));
  const newParams2 = {
    image_2: {
      src: image2Src?.path,
      title: imageObject2?.title,
      file: imageObject2?.rawFile
    },
    image_2_src: imageObject2?.url
  };

  const newParams = newParams2.image_2_src
    ? { ...params.data, ...newParams1, ...newParams2 }
    : { ...params.data, ...newParams1 };

  return newParams;
}

// retorn objetos de imagem

const imageObject = (
  imageOriginal: ImageOriginal
): ImageOriginal | undefined => {
  if (!imageOriginal) {
    return undefined;
  }
  if (imageOriginal.rawFile?.size === 0) {
    throw new Error('rawFile ImageObject undefined');
  }

  if (!imageOriginal.rawFile || imageOriginal === undefined) {
    return imageOriginal;
  }

  const newFile = new File(['xc'], 'file.pdf');

  const { rawFile = newFile } = imageOriginal;

  const imageId = uuidv4();
  const title = `images/${imageId}`;
  const url: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${title}`;
  const image: ImageObject = { title, rawFile, url };
  return { title, rawFile, url };
};

const uploadImage = async ({ rawFile, title, url }: ImageOriginal) => {
  if (rawFile === undefined || title === undefined) {
    return;
  }

  const { data, error: uploadError } = await supabaseClient.storage
    .from('images')
    .upload(title, rawFile, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.log('Error: ', uploadError);
  }
  return data;
};
