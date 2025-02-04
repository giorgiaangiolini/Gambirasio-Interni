import React from 'react';
import { createClient } from "../../prismicio";
// import Layout from "../components/layout";
// import { SliceZone } from "@prismicio/react";
// import { getLocales } from '../../helpers/getLocales';


export default function Storia({storia, settings, locales}) {

  return (
     <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
     >
        <p>ciao</p>
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