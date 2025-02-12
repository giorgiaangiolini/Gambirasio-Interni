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

  const {width} = useWindowSize();

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Layout settings={settings} meta={servizi.data} altLangs={servizi.alternate_languages}>
      <div className="flex md:flex-row flex-col-reverse min-h-screen max-h-screen md:pt-8 pt-6 pb-2 md:px-4 px-1 gap-4 justify-end md:justify-start">
        <div className="md:w-[30%] w-full relative">
          <div className="md:sticky md:top-[50vh] md:-translate-y-1/2 pr-8 text-grey">
            <FadeInAnimation>
            <div className="flex flex-col gap-1 uppercase relative ">
              <div
                className="absolute left-[0px] transition-transform duration-300 ease-in-out md:top-[7px] top-[5px] md:text-base text-xs"
                style={{
                  transform: `translateY(${selectedIndex * (width >= 768 ? 36 : 28)}px)`,
                }}
              >
                 <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4.5" cy="4.5" r="2.5" fill="currentColor"/>
              </svg>
              </div>

              {data.servizi.map((item, index) => (
                <button
                  key={index}
                  className={`text-left hover:opacity-70 transition-all duration-300 ease-in-out uppercase md:text-base text-xs ${selectedIndex === index ? "md:translate-x-[25px] translate-x-[20px]" : ""}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  {item.servizio}
                </button>
              ))}
            </div>
            </FadeInAnimation>
          </div>
          <div className="md:absolute bottom-0 left-0 w-full text-grey md:mt-0 mt-5">
            {/* <FadeInAnimation className={"h-full"}> */}
              <PrismicRichText
                field={data.servizi[selectedIndex].descrizione}
                components={{
                  paragraph: ({children}) => <p className="text-[14px]">{children}</p>
                }}
              />
            {/* </FadeIn> */}
          </div>
        </div>

        <div className="md:w-[70%] w-full">
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
