import React from 'react';
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { getLocales } from '../../helpers/getLocales';


export default function Servizi({servizi, settings, locales}) {
  const {data} = servizi;

  console.log(data, "gg");
  
  return (
     <Layout
      settings={settings}
      meta={servizi.data}
      altLangs={locales}
     >


 
    </Layout>
  )
}


export async function getStaticProps({ params, locale, previewData }) {

  const client = createClient({ previewData });

  try{

    const servizi = await client.getSingle("servizi",{ lang: locale}
   );

    const settings = await client.getSingle("settings",{ lang: locale});

    const locales = await getLocales(servizi, client)


    if (!servizi || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        servizi,
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