import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@studio-freight/react-lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


const ParallaxAnimation = ({ children, speed = 1, id = "parallax" }) => {
  const trigger = useRef();
  const target = useRef();
  const timeline = useRef();

  const lenis = useLenis();

  useGSAP(() => {

    const y = window.innerHeight * speed * 0.1;
    const setY = gsap.quickSetter(target.current, "y", "px");

    timeline.current = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          setY(self.progress * y);
        },
      },
    },{ dependencies: [], scope: trigger.current });

  }, [id, speed, lenis]);



  return (
    <div ref={trigger} className="absolute top-0 w-full h-full min-h-full min-w-full left-0">
      <div ref={target}>{children}</div>
    </div>
  );
}

export default ParallaxAnimation;