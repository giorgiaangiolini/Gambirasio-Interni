import React, { useState, useRef, useEffect } from "react";
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { getLocales } from "../../helpers/getLocales";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import TextAnimation from "@/components/Animations/TextAnimation";
import FadeInAnimation from "@/components/Animations/FadeInAnimation";
import { PrismicLink } from "@prismicio/react";

export default function Contatti({ contatti, settings, locales }) {
  const { data } = contatti;

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleToggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
    >
      <div className="flex md:flex-row flex-col-reverse min-h-full h-auto md:pt-5 pt-5 md:gap-4 gap-1 md:px-4 px-1 md:pb-0 pb-6">

        <div className="md:w-[30%] w-full flex md:flex-row flex-col md:items-center md:py-5">

     

          <FadeInAnimation>
            <div className="pr-2 text-grey  max-w-full">
              <div className="mb-4">
                <PrismicRichText field={data.testo_storia} />
              </div>

              <PrismicRichText field={data.testo_contatti} />
            </div>
          </FadeInAnimation>
        </div>


        <div className="md:w-[70%] w-full flex justify-end relative md:h-[calc(100vh-100px)] bg-grey">
          {data.video ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                poster={data.immagine?.url}
              >
                <source src={data.video?.url} type="video/mp4" />
              </video>
              
            </>
          ) : data.immagine ? (
            <PrismicNextImage
              field={data.immagine}
              className="w-full h-full object-cover"
              alt={data.immagine?.alt}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  try {
    const contatti = await client.getSingle("contatti", { lang: locale });

    const settings = await client.getSingle("settings", { lang: locale });

    const locales = await getLocales(contatti, client);

    if (!contatti || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        contatti,
        settings,
        locales,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
}
