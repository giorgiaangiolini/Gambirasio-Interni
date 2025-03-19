import React, { useState, useMemo, useRef } from "react";
import { createClient } from "../../prismicio";
import Layout from "../../components/layout";
import { getLocales } from "../../../helpers/getLocales";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import FadeStagger from "@/components/Animations/FadeStagger";
import FadeInAnimation from "@/components/Animations/FadeInAnimation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PrismicRichText } from "@prismicio/react";

export default function Collezioni({ collezioni, settings, locales, collezione }) {
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

  const contentRef = useRef(null);

  useGSAP(() => {
    // Clear any existing animations
    gsap.killTweensOf(".collezione_card");
    gsap.set(".collezione_card", { opacity: 0 });
    // Animate fade in of collection cards
    gsap.fromTo(
      ".collezione_card",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        stagger: 0.1,
        ease: "power3.out"
      }
    );

  }, [selectedTag]);

  return (
    <Layout settings={settings} meta={data} altLangs={locales}>
      <div ref={contentRef} className="flex md:flex-row flex-col min-h-full md:pt-5 pt-5  md:px-4 px-1">
        <div className="md:w-[30%] w-full md:block hidden md:min-h-[calc(100vh-100px)]">
          <div className="sticky md:top-[50vh] md:-translate-y-1/2 pr-8 text-grey mb-2">
            <div className="flex md:flex-col md:gap-1 gap-3  relative md:text-base text-xs">
              <PrismicRichText field={collezione.data.testo} />
              {/* Indicatore SVG animato */}
              {/* <div
                className="absolute left-[0px] transition-transform duration-300 ease-in-out top-[7px] md:block hidden"
                style={{
                  transform: `translateY(${selectedTag === null ? 0 : (uniqueTags.indexOf(selectedTag) + 1) * 34}px)`,
                }}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4.5" cy="4.5" r="2.5" fill="currentColor" />
                </svg>
              </div>

              <button
                className={`text-left hover:opacity-70 transition-all duration-300 ease-in-out uppercase  ${selectedTag === null ? "md:translate-x-[25px] underline md:no-underline" : ""}`}
                onClick={() => setSelectedTag(null)}
              >
                Tutti
              </button>
              {uniqueTags.map((tag, index) => (
                <button
                  key={index}
                  className={`text-left hover:opacity-70 transition-all duration-300 ease-in-out uppercase ${selectedTag === tag ? "md:translate-x-[25px] underline md:no-underline" : ""}`}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                >
                  {tag}
                </button>
              ))} */}
            </div>
          </div>
        </div>

        <div className="md:w-[70%] w-full">
        <FadeInAnimation>
          <div className="grid md:grid-cols-3 grid-cols-2 md:gap-1 gap-[5px]">
              {filteredCollezioni.map((item, i) => {
                return (
                  <Link className="collezione_card" key={i} href={`/collezione/${item.uid}`}>
                    <div key={i} className="w-full">
                      <div className="relative w-full group overflow-hidden aspect-4-5">
                        <div
                          style={{
                            backgroundImage:
                              "url(" +
                              `${item.data.cover_02?.url}?blur=10&w=2` +
                              ")",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                          className="absolute w-full h-full top-0 left-0"
                        >
                          <PrismicNextImage
                            field={item.data.cover_01}
                            className="object-cover w-full h-full cover_1"
                            alt={item.data.cover_01?.alt}
                            loading="eager"
                            sizes="(min-width: 768px) 25vw, 100vw"
                          />

                          <PrismicNextImage
                            field={item.data.cover_02}
                            className="absolute md:block hidden inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                            loading="eager"
                            sizes="(min-width: 768px) 25vw, 100vw"
                            alt={item.data.cover_02?.alt}
                          />
                        </div>
                      </div>
                      <div className="text-grey leading-none py-1 text-sm md:flex hidden  justify-between gap-3 ">
                        <p className="max-w-[90%]">{item.data.didascalia}</p>
                        <p className="min-w-fit">{item.data.prezzo}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
          </FadeInAnimation>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  try {
    const collezioni = await client.getAllByType("oggetto", { 
      orderings: {
        field: "my.oggetto.data",
        direction: "desc",
      },
      lang: locale });

    const settings = await client.getSingle("settings", { lang: locale });
    const collezione = await client.getSingle("collezione", { lang: locale });


    if (!collezioni || !settings) {
      return { notFound: true };
    }

    const locales = await getLocales(collezione, client)

    return {
      props: {
        collezioni,
        settings,
        collezione,
        locales,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
}
