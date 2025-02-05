import React from 'react';
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { SliceZone } from "@prismicio/react";
import { getLocales } from '../../helpers/getLocales';
import { components } from '@/slices';
import Slideshow from '@/components/slideshow';


export default function Home({home, settings, locales}) {

  const {data} = home;
  console.log(data, "data");
  

  return (
     <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
     >
      <SliceZone slices={home.data.slices} context={settings} components={components} /> 
      <div className="flex items-center justify-between px-4 absolute top-1/2 -translate-y-1/2 left-0 w-full z-10 bg-transparent">
        <div className="text-grey max-w-md mix-blend-difference">
          {data.testo[0].text}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          {data.logo && (
            <img 
              src={data.logo.url}
              alt={data.logo.alt || "Logo"}
              className="h-[10vw] w-auto"
            />
          )}
        </div>
      </div>
    </Layout>
  )
}


export async function getStaticProps({ params, locale, previewData }) {

  const client = createClient({ previewData });

  try{

    const home = await client.getSingle("homepage",{ lang: locale}
   );

    const settings = await client.getSingle("settings",{ lang: locale});

    const locales = await getLocales(home, client)


    if (!home || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        home,
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