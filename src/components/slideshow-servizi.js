import React from 'react'
import { useRef, useEffect } from 'react';
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

  
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  }, [index]);


  useEffect(()=>{

    let videos = slideRef.current.querySelectorAll("video");
    videos.forEach(item => {
      item.pause();
      item.currentTime = 0;
    });

    let active = slideRef.current.querySelector(".swiper-slide-active");
    let video = active.querySelectorAll("video");
    if(video){
      video.forEach(item => {
        item.currentTime = 0;
        item.play();
      });
    }
  }, [index])
  

  return(
    <div ref={slideRef} className='h-full w-full pointer-events-none'>    
          <Swiper
            ref={swiperRef}
            modules={[Navigation, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            speed={600}
            loop={true}
            initialSlide={index || 0}
            className='h-full w-full'
          >
          {content?.map((item, i)=>{
            return(
             <SwiperSlide key={i}>
             {item.video ? (
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