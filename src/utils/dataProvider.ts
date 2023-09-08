import { supabaseClient } from './supabase';
import { supabaseDataProvider } from 'ra-supabase-core';
import { useRecordContext, withLifecycleCallbacks } from 'react-admin';
import { v4 as uuidv4 } from 'uuid';

type ImageOriginal = {
  rawFile: File;
  title?: string;
  src?: string;
};

type ImageObject = {
  path: string;
  rawFile: File;
  imageUrl: string;
};

type ImageObjectMap = {
  [x: string]: any;
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
        const imageObject1 = params.data.image_1
          ? imageObjectFinal(params.data.image_1)
          : null;
        imageObject1 && uploadImageToStorage(imageObject1);

        const imageObject2 = params.data.image_2
          ? imageObjectFinal(params.data.image_2)
          : null;
        imageObject2 && uploadImageToStorage(imageObject2);

        const newParams = {
          ...params.data,
          image_1: imageObject1?.image?.imageUrl!,
          image_2: imageObject2?.image?.imageUrl!
        }!;

        return dataProvider.create('work', {
          data: {
            ...newParams
          }
        });
      },
      beforeUpdate: async (params: Partial<any>, dataProvider: any) => {
        const imageObject1 = params.data.image_1
          ? imageObjectFinal(params.data.image_1)
          : null;
        imageObject1 && uploadImageToStorage(imageObject1);

        const imageObject2 = params.data.image_2
          ? imageObjectFinal(params.data.image_2)
          : null;
        imageObject2 && uploadImageToStorage(imageObject2);

        const newParams = {
          ...params.data,
          image_1: imageObject1?.image?.imageUrl!,
          image_2: imageObject2?.image?.imageUrl!
        }!;

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
        const imageObject1 = params.data.image_1
          ? imageObjectFinal(params.data.image_1)
          : null;
        imageObject1 && uploadImageToStorage(imageObject1);

        const imageObject2 = params.data.image_2
          ? imageObjectFinal(params.data.image_2)
          : null;
        imageObject2 && uploadImageToStorage(imageObject2);

        const newParams = {
          ...params.data,
          image_1: imageObject1?.image?.imageUrl!,
          image_2: imageObject2?.image?.imageUrl!
        }!;

        return dataProvider.create('portfolio', {
          data: {
            ...newParams
          }
        });
      },
      beforeUpdate: async (params: Partial<any>, dataProvider: any) => {
        const imageObject1 = params.data.image_1
          ? imageObjectFinal(params.data.image_1)
          : null;
        imageObject1 && uploadImageToStorage(imageObject1);

        const imageObject2 = params.data.image_2
          ? imageObjectFinal(params.data.image_2)
          : null;
        imageObject2 && uploadImageToStorage(imageObject2);

        const newParams = {
          ...params.data,
          image_1: imageObject1?.image?.imageUrl!,
          image_2: imageObject2?.image?.imageUrl!
        }!;

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

function imageObjectFinal(image: ImageOriginal) {
  if (!image || !image.rawFile) {
    throw new Error('image.rawFile undefined');
  }

  return imageObject({ rawFile: image.rawFile });
}

const uploadImageToStorage = async ({ image }: ImageObjectMap) => {
  const { rawFile } = image;
  console.log(rawFile);
  const path = image ? image.path : '';
  if (rawFile === undefined) {
    console.log('error');
    return;
  }

  const { data: storageUploadData, error: uploadError } =
    await supabaseClient.storage.from('images').upload(path, rawFile, {
      cacheControl: '3600',
      upsert: false
    });
  return { storageUploadData, uploadError };
};

// retorn objetos de imagem

const imageObject = ({
  rawFile
}: Pick<ImageOriginal, 'rawFile'>): ImageObjectMap => {
  if (rawFile?.size === 0) {
    throw new Error('rawFile ImageObject undefined');
  }

  const imageId = uuidv4();

  const path = `images/${imageId}`;
  const imageUrl: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;

  const image: ImageObject = { path, rawFile, imageUrl };
  return { image };
};
