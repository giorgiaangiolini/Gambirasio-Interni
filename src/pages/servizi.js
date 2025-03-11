import React, { useState } from "react";
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { getLocales } from "../../helpers/getLocales";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import SlideshowServizi from "../components/slideshow-servizi";
import FadeInAnimation from "@/components/Animations/FadeInAnimation";
import useWindowSize from "../../helpers/useWindowSize";

export default function Servizi({ servizi, settings }) {
  const { data } = servizi;

  const { width } = useWindowSize();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(0);

  return (
    <Layout
      settings={settings}
      meta={servizi.data}
      altLangs={servizi.alternate_languages}
    >
      <div className="flex md:flex-row flex-col-reverse min-h-full md:pt-5 pt-5 md:px-5 px-1 md:gap-4 gap-1 md:pb-0 pb-4 justify-end md:justify-start">

        <div className="md:w-[30%] h-full w-full relative">
            <div className="flex flex-col h-full justify-center gap-0 relative md:min-h-[calc(100vh-100px)]">

              {data.servizi.map((item, index) => (
                <div key={index} className="overflow-hidden">
                  <button
                    onClick={() => {
                      setSelectedIndex(index);
                      setOpenAccordion(openAccordion === index ? null : index);
                    }}
                    className={`text-left hover:opacity-70 uppercase md:text-[16px] text-[16px] transition-all duration-[200ms] font-secondary mb-1 relative  ${
                      selectedIndex === index ? "before:content-[''] pl-2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-black before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2" : ""
                    }`}
                  >
                    {item.servizio}
                  </button>
                  <div 
                    className={` origin-top transition-opacity duration-[1s] ease-in-out ${
                      openAccordion === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pb-1 max-w-[350px]">
                    <PrismicRichText
                      field={item.descrizione}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="md:text-base ">{children}</p>
                        ),
                      }}
                    />
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>

        <div className="md:w-[70%] w-full md:h-[calc(100vh-100px)] h-auto">
          <FadeInAnimation className={"h-full"}>
            <SlideshowServizi index={selectedIndex} content={data.servizi} />
          </FadeInAnimation>
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

    if (!servizi || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        servizi,
        settings,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
}
