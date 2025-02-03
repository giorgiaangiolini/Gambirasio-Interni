import Layout from "../../components/layout";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../../../slices";
export default function Page({ page, settings }) {

  const {data} = page;
  
    return ( 
      <Layout
      settings={settings}
      meta={data}
      altLangs={page.alternate_languages}
      >
      <SliceZone slices={data.slices} components={components} />

    </Layout>
  )
  
}

export async function getStaticPaths() {
  const client = createClient();
  const page = await client.getAllByType('page', { lang: '*' })
  return {
    paths: page.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang }
    }),
    fallback: false,
  }
}



export async function getStaticProps({ params, previewData, locale }) {

  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid,
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