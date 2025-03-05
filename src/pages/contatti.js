import React, { useState, useRef, useEffect } from 'react';
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { getLocales } from '../../helpers/getLocales';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import TextAnimation from "@/components/Animations/TextAnimation";
import FadeInAnimation from '@/components/Animations/FadeInAnimation';

export default function Contatti({contatti, settings}) {

  const {data} = contatti;

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
      altLangs={contatti.alternate_languages}
     >
      <div className="flex md:flex-row flex-col-reverse md:h-screen h-auto md:pt-8 pt-6 pb-2 md:gap-4 gap-2 md:px-4 px-1">
        <div className="md:w-1/2 w-full flex md:flex-row flex-col md:items-center">
          <FadeInAnimation>
          <div className="pr-2 text-grey md:max-w-[500px] max-w-full">
            <PrismicRichText field={data.testo_contatti} />
          </div>

          </FadeInAnimation>
          <div className="md:px-4 px-0 pb-2 md:absolute relative bottom-0 left-0 md:w-1/2 w-full text-grey md:mt-0 mt-3">
           <PrismicRichText field={data.testo_storia} />
          </div>

        </div>


        <div className="md:w-1/2 w-full flex justify-end relative">
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
              <button 
              onClick={handleToggleAudio}
              className='absolute md:bottom-2 bottom-1 md:right-2 right-1 z-10 pointer-events-auto p-[5px] rounded-full transition-all  bg-white md:hover:scale-[1.05] transform duration-300'
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="md:w-3 md:h-3 w-2 h-2 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="md:w-3 md:h-3 w-2 h-2 opacity-50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
              )}
            </button>
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
  )
}


export async function getStaticProps({ params, locale, previewData }) {

  const client = createClient({ previewData });

  try{

    const contatti = await client.getSingle("contatti",{ lang: locale}
   );

    const settings = await client.getSingle("settings",{ lang: locale});

    const locales = await getLocales(contatti, client)


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

  }
  catch(e){
    console.log(e)
    return { notFound: true };
  }
}