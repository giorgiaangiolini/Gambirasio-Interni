import React, { useRef } from 'react';
import {useIsomorphicLayoutEffect} from "../../../helpers/isomorphicEffect";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { useGSAP } from '@gsap/react';
if (typeof window !== "undefined"){
  gsap.registerPlugin(ScrollTrigger)
}

const FadeIn = ({children}) => {

  const fadeRef = useRef(); 

  useGSAP(()=>{

    const anim = gsap.fromTo(fadeRef.current,
    {autoAlpha: 0},{ y: 0, duration: 1, autoAlpha: 1, delay: 0.2, ease: "ease"});

    ScrollTrigger.create({
      trigger: fadeRef.current,
      animation: anim,
    });
    ScrollTrigger.refresh();

  },{ dependencies: [], scope: fadeRef })



  return (
    <div ref={fadeRef} className='fade_in'>{children}</div>
  )
}

export default FadeIn
