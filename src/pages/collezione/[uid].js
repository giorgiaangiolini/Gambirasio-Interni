import Layout from "../../components/layout";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../../prismicio";
import { PrismicNextImage } from "@prismicio/next";
import FadeStagger from "@/components/Animations/FadeStagger";
import FadeInAnimation from "@/components/Animations/FadeInAnimation";
import { getLocales } from "../../../helpers/getLocales";
import { useRouter } from "next/router";

export default function Oggetto({ page, settings, locales }) {
  const { data } = page;
  const router = useRouter();

  return (
    <Layout settings={settings} meta={data} altLangs={locales}>
      <div className="flex md:flex-row flex-col min-h-full md:pt-5 pt-6 md:pb-2 pb-4 md:px-4 px-1">
        <div className="md:w-[30%] w-full">
          <div className="sticky flex flex-col md:gap-2 gap-1 md:top-[50vh] md:-translate-y-1/2 md:pr-8 text-grey md:text-base text-xs md:mb-0 mb-1">
            <FadeInAnimation>{data.descrizione}</FadeInAnimation>
            <a href="mailto:info@gambirasio.it" target="_blank" className="text-grey underline hover:opacity-50">
              {router.locale === "en-gb" ? "Request Information" : "Richiedi informazioni"}
            </a>
          </div>
        </div>
        <div className="md:w-[70%] w-full">
          <FadeStagger>
            <div className="flex flex-col gap-1">
            {data.immagini.map((img, i) => (
                <div
                key={i} className="w-full flex justify-end md:h-[calc(100vh-60px)]">
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
  const locales = await getLocales(page, client);

  return {
    props: {
      page,
      settings,
      locales
    },
  };
}
