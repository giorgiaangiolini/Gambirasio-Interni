/**
 * @typedef {import("@prismicio/client").Content.SlideshowSlice} SlideshowSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SlideshowSlice>} SlideshowProps
 * @type {import("react").FC<SlideshowProps>}
 *
 */

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Mousewheel,
  Navigation,
  A11y,
  Virtual,
  Autoplay,
  Keyboard,
} from "swiper";
import SwiperCore from "swiper";
import { PrismicNextImage } from "@prismicio/next";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "swiper/css/effect-fade";
import { EffectFade } from "swiper";

SwiperCore.use([Navigation, Autoplay, A11y]);

const Slideshow = ({ slice }) => {
  const slideRef = useRef();
  const [index, setIndex] = useState(0);


  useEffect(() => {
    let videos = slideRef.current.querySelectorAll("video");
    videos.forEach((item) => {
      item.pause();
    });

    let active = slideRef.current.querySelector(".swiper-slide-active");
    let video = active.querySelectorAll("video");
    if (video) {
      video.forEach((item) => {
        item.play();
      });
    }
  }, [index]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="home_slideshow relative"
    >
      <div ref={slideRef} className="md:h-[calc(100vh-50px)] h-[calc(100vh-40px)] pt-5 md:px-4">
        <Swiper
          modules={[A11y, Keyboard, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          keyboard={{
            enabled: true,
          }}
          speed={1000}
          grabCursor={true}
          className="h-full w-full"
          onClick={(swiper) => {
            if (swiper.activeIndex === swiper.slides.length - 1) {
              swiper.slideTo(0);
            } else {
              swiper.slideNext();
            }
          }}
          onSlideChange={(swiper) => {
            setIndex(swiper.activeIndex);
          }}
        >
          {slice.primary.slideshow?.map((item, index) => {
            if (item.immagine?.url) {
              return (
                <SwiperSlide key={index} className="h-full w-full">
                  <div
                    className="h-full w-full relative"
                    style={{
                      backgroundImage: `url(${item.immagine.url}?blur=10&w=2)`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {item.immagine_mobile?.url ? (
                      <>
                        <PrismicNextImage
                          field={item.immagine}
                          fill
                          className="object-cover w-full md:block hidden"
                          alt={item.immagine.alt || ""}
                        />
                        <PrismicNextImage
                          field={item.immagine_mobile}
                          fill
                          className="object-cover w-full md:hidden block"
                          alt={item.immagine_mobile.alt || item.immagine.alt || ""}
                        />
                      </>
                    ) : (
                      <PrismicNextImage
                        field={item.immagine}
                        fill
                        className="object-cover w-full"
                        alt={item.immagine.alt || ""}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            }
            if (item.video?.url) {
              return (
                <SwiperSlide key={index} className="h-full w-full">
                  <div className="h-full w-full relative section_video">
                    <video
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                    >
                      <source src={item.video.url} type="video/mp4" />
                    </video>
                  </div>
                </SwiperSlide>
              );
            }
            return null;
          })}
        </Swiper>
      </div>

    </section>
  );
};

export default Slideshow;
