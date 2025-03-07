import Layout from "../../components/layout";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../../prismicio";
import { PrismicNextImage } from "@prismicio/next";
import FadeStagger from "@/components/Animations/FadeStagger";
import FadeInAnimation from "@/components/Animations/FadeInAnimation";

export default function Oggetto({ page, settings }) {
  const { data } = page;

  return (
    <Layout settings={settings} meta={data} altLangs={page.alternate_languages}>
      <div className="flex md:flex-row flex-col min-h-full md:pt-5 pt-6 md:pb-2 pb-4 md:px-4 px-1">
        <div className="md:w-[30%] w-full">
          <div className="sticky md:top-[50vh] md:-translate-y-1/2 md:pr-8 text-grey md:text-base text-xs md:mb-0 mb-1">
            <FadeInAnimation>{data.descrizione}</FadeInAnimation>
          </div>
        </div>
        <div className="md:w-[70%] w-full">
          <FadeStagger>
            <div className="flex flex-col gap-1">
              {data.immagini.map((img, i) => (
                <div
                  key={i}
                  className={`w-full flex justify-end md:h-[calc(100vh-90px)]`}
                >
                  <PrismicNextImage
                    field={img.immagine}
                    className="md:w-auto w-full md:h-full h-auto object-cover"
                    alt={img.immagine?.alt}
                  />
                </div>
              ))}
            </div>
          </FadeStagger>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const client = createClient();
  const page = await client.getAllByType("oggetto", { lang: "*" });
  return {
    paths: page.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params, previewData, locale }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("oggetto", params.uid, {
    lang: locale,
  });

  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      page,
      settings,
    },
  };
}
