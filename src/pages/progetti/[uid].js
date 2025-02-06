import Layout from "../../components/layout";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../../prismicio";
import { SliceZone } from "@prismicio/react";
import { PrismicNextImage } from '@prismicio/next';

export default function Progetto({ page, settings }) {

  const {data} = page;
  
    return ( 
      <Layout
      settings={settings}
      meta={data}
      altLangs={page.alternate_languages}
      >
        <div className="flex min-h-screen pt-8 pb-2">
          <div className="w-[30%]">
            <div className="sticky top-[50vh] -translate-y-1/2 pr-8 text-grey">
              {data.descrizione_progetto}
            </div>
          </div>
          <div className="w-[70%]">
            <div className="flex flex-col gap-1">
              {data.immagini.map((img, i) => (
                <div key={i} className="w-full flex justify-end" style={{height: 'calc(100vh - 90px)'}}>
                  <PrismicNextImage
                    field={img.immagine}
                    className="w-auto h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

    </Layout>
  )
  
}

export async function getStaticPaths() {
  const client = createClient();
  const page = await client.getAllByType('progetto', { lang: '*' })
  return {
    paths: page.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang }
    }),
    fallback: false,
  }
}



export async function getStaticProps({ params, previewData, locale }) {

  const client = createClient({ previewData });

  const page = await client.getByUID("progetto", params.uid,
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