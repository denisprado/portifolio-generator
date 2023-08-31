import { supabaseClient } from './supabase';
import { supabaseDataProvider } from 'ra-supabase-core';
import { withLifecycleCallbacks } from 'react-admin';

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
      beforeSave: async (params, dataProvider) => {
        // Freshly dropped pictures are File objects and must be converted to base64 strings
        console.log('data', params);

        const { data, error } = await supabaseClient.storage
          .from('images')
          .upload(`images/${params.image_1?.title}`, params.image_1.rawFile, {
            cacheControl: '3600',
            upsert: false
          });

        console.log(data);

        if (error) {
          console.log(error);
          throw new Error(error.message);
        }

        // Salve a URL da imagem no banco de dados
        // const imageUrl = `${
        //   process.env.NEXT_PUBLIC_SUPABASE_URL
        // }/storage/v1/object/public/images/${data.path}`;
        // const { data: newProduct, error: productError } = await supabaseClient
        //   .from('work')
        //   .insert([{ ...params.data, data: imageUrl }]);

        // const newPictures = params.image_1.filter(
        //   (p: { rawFile: any }) => p.rawFile instanceof File
        // );
        // const formerPictures = params.image_1.filter(
        //   (p: { rawFile: any }) => !(p.rawFile instanceof File)
        // );

        // const base64Pictures = await Promise.all(
        //   newPictures.map(convertFileToBase64)
        // );

        // const pictures = [
        //   ...base64Pictures.map((dataUrl, index) => ({
        //     src: dataUrl,
        //     title: newPictures[index].name
        //   })),
        //   ...formerPictures
        // ];
        return params;
      }
    }
  ]
);

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file: { rawFile: Blob }) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
  });

export default dataProvider;
