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
      <div className="flex md:flex-row flex-col-reverse min-h-screen md:pt-5 pt-5 pb-2 md:px-4 px-1 gap-4 justify-end md:justify-start">

        <div className="md:w-[30%] h-full w-full relative">
          <div className=" pr-8 text-grey ">
              <div className="flex flex-col justify-center gap-1  relative ">

                {data.servizi.map((item, index) => (
                  <div key={index} className="overflow-hidden">
                    <button
                      onClick={() => {
                        setSelectedIndex(index);
                        setOpenAccordion(openAccordion === index ? null : index);
                      }}
                      className={`text-left hover:opacity-70 transition-all duration-300 ease-in-out uppercase md:text-base text-xs ${
                        selectedIndex === index ? "md:translate-x-[25px] translate-x-[20px]" : ""
                      }`}
                    >
                      {item.servizio}
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out origin-top ${
                        openAccordion === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <PrismicRichText
                        field={item.descrizione}
                        components={{
                          paragraph: ({ children }) => (
                            <p className="text-[14px]">{children}</p>
                          ),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>

        <div className="md:w-[70%] w-full h-[calc(100vh-100px)]">
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
