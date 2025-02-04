import React from 'react';
import { createClient } from "../../prismicio";
// import Layout from "../components/layout";
// import { SliceZone } from "@prismicio/react";
// import { getLocales } from '../../helpers/getLocales';


export default function Contatti({contatti, settings, locales}) {


  return (
     <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
     >
       
    </Layout>
  )
}


export async function getStaticProps({ params, locale, previewData }) {

  const client = createClient({ previewData });

  try{

    const contatti = await client.getSingle("contatti",{ lang: locale}
   );

    const settings = await client.getSingle("settings",{ lang: locale});

    const locales = await getLocales(contatti, client)


    if (!contatti || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        contatti,
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