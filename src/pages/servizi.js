import React, { useState } from "react";
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { getLocales } from "../../helpers/getLocales";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import SlideshowServizi from "../components/slideshow-servizi";
import FadeIn from "@/components/Animations/FadeIn";

export default function Servizi({ servizi, settings, locales }) {
  const { data } = servizi;

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Layout settings={settings} meta={servizi.data} altLangs={locales}>
      <div className="flex min-h-screen pt-8 pb-2 px-4 gap-4">
        <div className="w-[30%] relative">
          <div className="sticky top-[50vh] -translate-y-1/2 pr-8 text-grey">
            <FadeIn>
            <div className="flex flex-col gap-2 uppercase relative">
              <div
                className="absolute left-[0px] transition-transform duration-300 ease-in-out top-[6px]"
                style={{
                  transform: `translateY(${selectedIndex * 46}px)`,
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="5" cy="5" r="4" fill="currentColor" />
                </svg>
              </div>

              {data.servizi.map((item, index) => (
                <button
                  key={index}
                  className={`text-left hover:opacity-70 transition-all duration-300 ease-in-out uppercase ${selectedIndex === index ? "translate-x-[25px]" : ""}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  {item.servizio}
                </button>
              ))}
            </div>
            </FadeIn>
          </div>
          <div className="absolute bottom-0 left-0 w-full text-grey">
            <FadeIn className={"h-full"}>
              <PrismicRichText
                field={data.servizi[selectedIndex].descrizione}
                components={{
                  paragraph: ({children}) => <p className="text-[14px]">{children}</p>
                }}
              />
            </FadeIn>
          </div>
        </div>

        <div className="w-[70%]">
          <FadeIn className={"h-full"}>
            <SlideshowServizi index={selectedIndex} content={data.servizi} />
          </FadeIn>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  try {
    const servizi = await client.getSingle("servizi", { lang: locale });

    const settings = await client.getSingle("settings", { lang: locale });

    const locales = await getLocales(servizi, client);

    if (!servizi || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        servizi,
        settings,
        locales,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
}
