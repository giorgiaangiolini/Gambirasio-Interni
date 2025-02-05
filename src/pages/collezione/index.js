import React from 'react';
import { createClient } from "../../prismicio";
import Layout from "../../components/layout";
import { getLocales } from '../../../helpers/getLocales';


export default function Collezioni({collezioni, settings, locales}) {

  console.log(collezioni)

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

    const collezioni = await client.getAllByType("oggetto",{ lang: locale}
   );

    const settings = await client.getSingle("settings",{ lang: locale});

    const locales = await getLocales(collezioni, client)


    if (!collezioni || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        collezioni,
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