import React, { useRef} from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText.js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import { CustomEase } from "gsap/dist/CustomEase.js";

if (typeof window !== "undefined"){
  gsap.registerPlugin(SplitText)
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(CustomEase)
}

const TitleAnimation = ({children}) => {

  const titleRef = useRef(); 

  useGSAP(()=>{

    CustomEase.create("titleEase", "M0,0 C0.65,0.05 0,1 1,1");

    let split = SplitText.create(titleRef.current, { 
      type: "line,words,chars",
      wordsClass: "split-line-custom"
    });
    
    let words = split.words;
    const anim = gsap.fromTo(words,
      {
        clipPath: "polygon(-45% 450%, 120% 450%, 120% 450%, -45% 450%)",
        y: 10,
        autoAlpha: 0
      },
      {
        clipPath: "polygon(-45% -45%, 150% -45%, 150% 150%, -45% 150%)",
        y: 0,
        duration: 0.5,
        autoAlpha: 1,
        ease: "titleEase",
        stagger: 0.01
      }
    );
    
    ScrollTrigger.create({
      trigger: titleRef.current,
      animation: anim,
    });
    
    ScrollTrigger.refresh();

  },{ dependencies: [], scope: titleRef.current })



  return (
    <div ref={titleRef} className='title_animation'>{children}</div>
  )
}

export default TitleAnimation
