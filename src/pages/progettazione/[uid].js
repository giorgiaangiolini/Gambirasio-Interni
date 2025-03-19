import Layout from "../../components/layout";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../../prismicio";
import { SliceZone } from "@prismicio/react";
import { PrismicNextImage } from '@prismicio/next';
import FadeStagger from "@/components/Animations/FadeStagger";
import FadeInAnimation from '@/components/Animations/FadeInAnimation';
import { getLocales } from "../../../helpers/getLocales";
export default function Progetto({ page, settings, locales }) {

  const {data} = page;
  
    return ( 
      <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
      >
        <div className="flex lg:flex-row flex-col min-h-screen lg:pt-5 pt-6 lg:pb-2 pb-4 md:px-4 px-1">
          <div className="lg:w-[30%] w-full">
            <div className="sticky lg:top-[50vh] md:-translate-y-1/2 lg:pr-8 text-grey lg:text-base text-xs lg:mb-0 mb-1">
            <FadeInAnimation>
              {data.descrizione_progetto}
              </FadeInAnimation>
            </div>
           
          </div>
          <div className="lg:w-[70%] w-full">
            
            <FadeStagger>
            <div className="flex flex-col gap-1 ">
              {data.immagini.map((img, i) => (
                <div
                key={i} className="w-full flex justify-end lg:h-[calc(100vh-60px)]">
                  <PrismicNextImage
                    field={img.immagine}
                    className="md:w-auto h-full object-cover"
                    alt={img.immagine?.alt}
                  />
                </div>
              ))}
            </div>
            </FadeStagger>
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

  const locales = await getLocales(page, client);

  return {
    props: {
      page,
      settings,
      locales
    },
  };

}