import React from 'react';
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { getLocales } from '../../helpers/getLocales';


export default function Progetti({progetti, settings, locales}) {

  console.log(progetti)
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

    const progetti = await client.getAllByType("progetto",{ lang: locale}
   );

    const settings = await client.getSingle("settings",{ lang: locale});

    const locales = await getLocales(progetti, client)


    if (!progetti || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        progetti,
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