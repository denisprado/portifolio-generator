import { supabaseClient } from './supabase';
import { supabaseDataProvider } from 'ra-supabase-core';
import { useRecordContext, withLifecycleCallbacks } from 'react-admin';

const dataProvider = withLifecycleCallbacks(
  supabaseDataProvider({
    instanceUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    supabaseClient
  }),
  [
    {
      /**
       * For posts update only, convert uploaded images to base 64 and attach them to
       * the `picture` sent property, with `src` and `title` attributes.
       */
      resource: 'work',
      beforeCreate: async (params: Partial<any>, dataProvider: any) => {
        // Freshly dropped pictures are File objects and must be converted to base64 strings
        console.log('params', params);

        const { data: storageUploadData, error } = await supabaseClient.storage
          .from('images')
          .upload(
            `images/${params.data.image_1.title}`,
            params.data.image_1.rawFile,
            {
              cacheControl: '3600',
              upsert: false
            }
          );

        console.log('storageUploadData', storageUploadData);

        if (error) {
          //throw new Error(error?.message!);
          return params;
        }

        const imageUrl: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/images/${params.data.image_1.title}`;

        const newParams = imageUrl
          ? { ...params.data, image_1: imageUrl }!
          : '';
        console.log('newParams', newParams);
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
