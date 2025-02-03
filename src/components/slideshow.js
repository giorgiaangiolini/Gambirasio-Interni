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

const Slideshow = ({ content }) => {

  return(
    <div className='project_slideshow'>    
          <Swiper
            key={content.id}
            modules={[Navigation, A11y, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            grabCursor={true}
            speed={600}
            loop={true}
          >
          {content?.map((item, index)=>{
            if(item.url){
              return (
                <SwiperSlide key={index}> 
                   <div
                   style={{  
                    backgroundImage: "url(" + `${item?.url}?blur=10&w=2` + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                    }}
                    className='aspect-custom-16-9'>
                    <PrismicNextImage className='min-h-full min-w-full object-cover' field={item} alt={item.alt} />
                  </div>
                </SwiperSlide>
              )
            }else return null
          })}
        
        </Swiper>
  </div>
  )

}

export default Slideshow