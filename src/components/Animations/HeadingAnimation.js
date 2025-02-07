import React, { useRef} from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText.js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

if (typeof window !== "undefined"){
  gsap.registerPlugin(SplitText)
  gsap.registerPlugin(ScrollTrigger)
}

const TextAnimationHeading = ({children}) => {

  const textRef = useRef(); 

  useGSAP(()=>{

    let split = SplitText.create(textRef.current, { type:"line,words,chars",
      wordsClass: "split-line"});
      let words = split.words;
      const anim = gsap.fromTo(words,
        {autoAlpha: 0, y: 10},{ y: 0, duration:0.6, autoAlpha: 1, ease: "ease", stagger: 0.01});

      ScrollTrigger.create({
        trigger: textRef.current,
        animation: anim,
      });

    ScrollTrigger.refresh();

  },{ dependencies: [], scope: textRef.current })



  return (
    <div ref={textRef} className='text_animation'>{children}</div>
  )
}

export default TextAnimationHeading
