import React from "react";
import { createClient } from "../../prismicio";
import Layout from "../../components/layout";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import FadeStagger from "@/components/Animations/FadeStagger";
import { getLocales } from "../../../helpers/getLocales";
import { PrismicRichText } from "@prismicio/react";
import { useRouter } from "next/router";
export default function Progetti({ progetti, settings, progettazione, locales }) {
  const { data } = progetti;
  const router = useRouter();

  return (
    <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
    >
      <div className="flex md:flex-row flex-col min-h-full md:pt-5 pt-6 md:px-4 px-1 md:pb-0 pb-4">

      <div className="md:w-[30%] w-full md:block hidden md:min-h-[calc(100vh-100px)]">
          <div className="sticky md:top-[50vh] md:-translate-y-1/2 pr-8 text-grey mb-2">
            <PrismicRichText field={progettazione.data.testo} />
          </div>
        </div>

        <div className="md:w-[70%] w-full">
          <FadeStagger>
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-1 gap-2 ">
              {progetti.map((progetto, i) => (
                <Link key={i} href={router.locale === "en-gb" ? `/projects/${progetto.uid}` : `/progettazione/${progetto.uid}`}>
                  <div key={i} className="w-full">
                    <div className="relative w-full  group overflow-hidden aspect-4-5">
                      <div className="absolute w-full h-full top-0 left-0">
                        <PrismicNextImage
                          field={progetto.data.cover}
                          className="object-cover w-full h-full"
                          alt={progetto.data.cover?.alt}
                        />
                        <PrismicNextImage
                          field={progetto.data.cover_02}
                          alt={progetto.data.cover_02?.alt}
                          className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 md:block hidden"
                        />
                      </div>
                    </div>
                    <div className="text-grey leading-none py-1 md:text-s text-xs">
                      <p>{progetto.data.didascalia}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeStagger>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  try {
    const progetti = await client.getAllByType("progetto", {
      orderings: {
        field: "my.progetto.data",
        direction: "desc",
      },
      lang: locale,
    });

    const settings = await client.getSingle("settings", { lang: locale });
    const progettazione = await client.getSingle("progettazione", { lang: locale });


    if (!progetti || !settings) {
      return { notFound: true };
    }

    const locales = await getLocales(progettazione, client)

    return {
      props: {
        progetti,
        progettazione,
        settings,
        locales,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
}
