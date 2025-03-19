import React, { useRef} from 'react';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { useGSAP } from '@gsap/react';


if (typeof window !== "undefined"){
  gsap.registerPlugin(ScrollTrigger)
}

const FadeStagger = ({children}) => {

  const parentRef = useRef(); 

  useGSAP(()=>{

    gsap.set(parentRef.current, {opacity: 1});
    gsap.set(parentRef.current.children[0].children, {autoAlpha: 0});

    ScrollTrigger.batch(parentRef.current.children[0].children, {
      trigger: parentRef.current,
      once: true,
      onEnter: batch => gsap.fromTo(batch,  { autoAlpha: 0 }, {autoAlpha: 1, duration: 0.5, stagger: 0.02, }),
    });

    ScrollTrigger.refresh();

  },{ dependencies: [], scope: parentRef.current })

  return (
    <div ref={parentRef} className='fadeIn_stagger opacity-0'>{children}</div>
  )
}

export default FadeStagger
