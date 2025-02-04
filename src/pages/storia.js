import React from 'react';
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { getLocales } from '../../helpers/getLocales';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

export default function Storia({storia, settings, locales}) {

  const {data} = storia;
  console.log(data, "gio");
  

  return (
     <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
     >
      <div className="flex h-screen pt-8 pb-2">
        <div className="w-1/2 flex items-center">
          <div className="pr-2 text-grey w-[50%]">
            <PrismicRichText field={data.testo} />
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <PrismicNextImage 
            field={data.immagine}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Layout>
  )
}


export async function getStaticProps({ params, locale, previewData }) {

  const client = createClient({ previewData });

  try{

    const storia = await client.getSingle("storia",{ lang: locale}
   );

    const settings = await client.getSingle("settings",{ lang: locale});

    const locales = await getLocales(storia, client)


    if (!storia || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        storia,
        settings,
        locales, 
      },
    };

  }
  catch(e){
    console.log(e)
    return { notFound: true };
  }
}