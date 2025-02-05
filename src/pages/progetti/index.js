import React from 'react';
import { createClient } from "../../prismicio";
import Layout from "../../components/layout";
import { PrismicNextImage } from '@prismicio/next';
import { getLocales } from '../../../helpers/getLocales';
import Link from 'next/link';

export default function Progetti({progetti, settings, locales}) {

  const {data} = progetti;


  return (
     <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
     >
       
       <div className="grid grid-cols-3 gap-1 pt-8 pb-2">
         {progetti.map((progetto, i) => (
           <Link href={`/progetti/${progetto.uid}`}>
             <div key={i} className="w-full">
              <div className="relative w-full aspect-[4/5] group">
                <PrismicNextImage
                  field={progetto.data.cover}
                  className="object-cover w-full h-full absolute inset-0 group-hover:opacity-0 transition-opacity duration-200"
                />
                <PrismicNextImage 
                  field={progetto.data.cover_02}
                  className="object-cover w-full h-full absolute inset-0 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
              <div className="text-grey leading-none py-1">
                  <p>{progetto.data.didascalia}</p>
              </div>
             </div>
           </Link>
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