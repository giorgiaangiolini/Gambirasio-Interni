import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Mousewheel, EffectFade, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Autoplay, Pagination, A11y, Mousewheel, EffectFade]);

const SlideshowServizi = ({ content, index }) => {

  const swiperRef = useRef(null);
  const slideRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  }, [index]);


  useEffect(() => {
    let videos = slideRef.current.querySelectorAll("video");
    videos.forEach(item => {
      item.pause();
      item.currentTime = 0;
      item.muted = true;
    });

    let active = slideRef.current.querySelector(".swiper-slide-active");
    let activeVideo = active.querySelector("video");
    if (activeVideo) {
      activeVideo.play();
    }
  }, [index]); // Rimuoviamo isMuted dalle dipendenze

  // Aggiungiamo un nuovo useEffect separato per gestire solo l'audio
  useEffect(() => {
    let active = slideRef.current.querySelector(".swiper-slide-active");
    let activeVideo = active.querySelector("video");
    if (activeVideo) {
      activeVideo.muted = isMuted;
    }
  }, [isMuted]); // Aggiungiamo isMuted come dipendenza

  const handleToggleAudio = () => {
    const active = slideRef.current.querySelector(".swiper-slide-active");
    const activeVideo = active.querySelector("video");
    if (activeVideo) {
      activeVideo.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return(
    <div ref={slideRef} className='h-full w-full pointer-events-none'> 
 
          <Swiper
            ref={swiperRef}
            modules={[Navigation, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            speed={800}
            loop={true}
            easing='cubic-bezier(0.4, 0, 0.2, 1)'
            initialSlide={index || 0}
            className='h-full w-full'
          >
          {content?.map((item, i)=>{
            return(
             <SwiperSlide key={i}>
             {item.video.url ? (
                <>
               <video 
                 autoPlay 
                 muted 
                 loop 
                 playsInline
                 poster={item.immagine?.url}
                 className='h-full w-full object-cover'
               >
                 <source src={item.video.url} type="video/mp4" />
               </video>
               <button 
               onClick={handleToggleAudio}
               className='absolute bottom-2 right-2 z-10 pointer-events-auto p-1 rounded-full transition-all'
             >
               {isMuted ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="w-3 h-3">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="w-3 h-3">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                 </svg>
               )}
             </button>
             </>
             ) : item.immagine ? (
               <PrismicNextImage 
                 field={item.immagine}
                 className='h-full w-full object-cover'
                 alt={item.immagine.alt || ''}
               />
             ) : null}
           </SwiperSlide>
            )
          })}
        
        </Swiper>
  </div>
  )

}

export default SlideshowServizi