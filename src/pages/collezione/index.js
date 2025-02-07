import React, { useState, useMemo } from "react";
import { createClient } from "../../prismicio";
import Layout from "../../components/layout";
import { getLocales } from "../../../helpers/getLocales";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import FadeStagger from "@/components/Animations/FadeStagger";
export default function Collezioni({ collezioni, settings, locales }) {
  const { data } = settings;

  const [selectedTag, setSelectedTag] = useState(null);

  // Estrai tutti i tag unici dalle collezioni
  const uniqueTags = useMemo(() => {
    const allTags = collezioni.flatMap((item) => item.tags || []);
    return [...new Set(allTags)].filter(Boolean);
  }, [collezioni]);

  // Filtra le collezioni in base al tag selezionato
  const filteredCollezioni = useMemo(() => {
    if (!selectedTag) return collezioni;
    return collezioni.filter(
      (item) => item.tags && item.tags.includes(selectedTag)
    );
  }, [collezioni, selectedTag]);

  return (
    <Layout settings={settings} meta={data} altLangs={locales}>
      <div className="flex min-h-screen pt-8 pb-2 px-4">
        <div className="w-[30%]">
          <div className="sticky top-[50vh] -translate-y-1/2 pr-8 text-grey">
          <div className="flex flex-col gap-2 uppercase relative">
            {/* Indicatore SVG animato */}
            <div 
              className="absolute left-[0px] transition-transform duration-300 ease-in-out top-[6px]"
              style={{ 
                transform: `translateY(${selectedTag === null ? 0 : (uniqueTags.indexOf(selectedTag) + 1) * 46}px)`
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="4" fill="currentColor"/>
              </svg>
            </div>

            <button
              className={`text-left hover:opacity-70 transition-all duration-300 ease-in-out uppercase  ${selectedTag === null ? 'translate-x-[25px]' : ''}`}
              onClick={() => setSelectedTag(null)}
            >
              Tutti
            </button>
            {uniqueTags.map((tag, index) => (
              <button
                key={index}
                className={`text-left hover:opacity-70 transition-all duration-300 ease-in-out uppercase ${selectedTag === tag ? 'translate-x-[25px]' : ''}`}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          </div>
        </div>

        <div className="w-[70%] grid grid-cols-3 gap-1">
          <div className="flex flex-col gap-1">
            <FadeStagger>
            {filteredCollezioni.map((item, i) => (
              <Link key={i} href={`/collezione/${item.uid}`}>
                <div key={i} className="w-full">
                  <div className="relative w-full group overflow-hidden aspect-4-5">
                    <div className="absolute w-full h-full top-0 left-0">
                      <PrismicNextImage
                        field={item.data.cover_01}
                        className="object-cover w-full h-full"
                      />
                      <PrismicNextImage
                        field={item.data.cover_02}
                        className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                      />
                    </div>
                  </div>
                  <div className="text-grey leading-none py-1 text-s">
                    <p>{item.data.didascalia}</p>
                  </div>
                </div>
              </Link>
            ))}
            </FadeStagger>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  try {
    const collezioni = await client.getAllByType("oggetto", { lang: locale });

    const settings = await client.getSingle("settings", { lang: locale });

    // const locales = await getLocales(collezioni, client)

    if (!collezioni || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        collezioni,
        settings,
        // locales,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
}
