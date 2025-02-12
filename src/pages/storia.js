import React from 'react';
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { getLocales } from '../../helpers/getLocales';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import TextAnimation from "@/components/Animations/TextAnimation";
import FadeInAnimation from '@/components/Animations/FadeInAnimation';
export default function Storia({storia, settings, locales}) {

  const {data} = storia;
  
  return (
     <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
     >
      <div className="flex md:flex-row flex-col-reverse md:h-scree h-auto md:pt-8 pt-6 pb-2 md:gap-4 gap-2 md:px-4 px-1">
        <div className="md:w-1/2 w-full flex items-center">
          <FadeInAnimation>
          <div className="md:pr-2 text-grey max-w-[500px]">
            <PrismicRichText field={data.testo} />
          </div>
          </FadeInAnimation>
        </div>

        <div className="md:w-1/2 w-full flex justify-end">
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