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
              <div className="relative w-full  group overflow-hidden aspect-4-5">
                <div className="absolute w-full h-full top-0 left-0">
                  <PrismicNextImage
                    field={progetto.data.cover}
                    className="object-cover w-full h-full"
                  />
                  <PrismicNextImage 
                    field={progetto.data.cover_02}
                    className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                  />
                </div>
              </div>
              <div className="text-grey leading-none py-1 text-s">
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