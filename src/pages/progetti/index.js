import React from 'react';
import { createClient } from "../../prismicio";
import Layout from "../../components/layout";
import { PrismicNextImage } from '@prismicio/next';
import { getLocales } from '../../../helpers/getLocales';


export default function Progetti({progetti, settings, locales}) {

  const {data} = progetti;
  console.log(progetti, "data");
  


  return (
     <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
     >
       
       <div className="grid grid-cols-3 gap-1 pt-8 pb-2">
         {progetti.map((progetto, i) => (
           <div key={i} className="w-full">
            <div className="relative w-full aspect-[3/4]">
              <PrismicNextImage
                field={progetto.data.cover}
                className="object-cover w-full h-full absolute inset-0"
              />
            </div>
           </div>
         ))}
       </div>

    </Layout>
  )
}


export async function getStaticProps({ params, locale, previewData }) {

  const client = createClient({ previewData });

  try{

    const progetti = await client.getAllByType("progetto",{ lang: locale}
   );

    const settings = await client.getSingle("settings",{ lang: locale});

    // const locales = await getLocales(progetti, client)

    console.log(progetti, "progetti")
    if (!progetti || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        progetti,
        settings,
        // locales, 
      },
    };

  }
  catch(e){
    console.log(e)
    return { notFound: true };
  }
}