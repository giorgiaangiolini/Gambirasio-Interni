import Layout from "../../components/layout";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../../prismicio";
export default function Oggetto({ page, settings }) {

  const {data} = page;
  
    return ( 
      <Layout
      settings={settings}
      meta={data}
      altLangs={page.alternate_languages}
      >

    </Layout>
  )
  
}

export async function getStaticPaths() {
  const client = createClient();
  const page = await client.getAllByType('oggetto', { lang: '*' })
  return {
    paths: page.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang }
    }),
    fallback: false,
  }
}



export async function getStaticProps({ params, previewData, locale }) {

  const client = createClient({ previewData });

  const page = await client.getByUID("oggetto", params.uid,
  {
    lang: locale
  });

  const settings = await client.getSingle("settings",{ lang: locale});

  return {
    props: {
      page,
      settings
    },
  };

} 