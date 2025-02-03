import React, { useRef, useState, useEffect, useLayoutEffect, StrictMode } from 'react';
import {useIsomorphicLayoutEffect} from "../../../helpers/isomorphicEffect";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin.js";
import useWindowSize from '../../../helpers/useWindowSize';

if (typeof window !== "undefined"){
  gsap.registerPlugin(ScrollToPlugin)
}

const ScrollDown = ({className}) => {

  const scrollRef = useRef(); 
  const size = useWindowSize();


  return (
    <div onClick={()=> gsap.to(window, {duration: 1, scrollTo:size.height}) } ref={scrollRef} className={`scroll_down ${className}`}>
      <svg width="19" height="30" viewBox="0 0 19 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.353553" y1="20.3105" x2="9.68929" y2="29.6462" stroke="white"/>
      <line x1="8.98238" y1="29.6462" x2="18.3181" y2="20.3105" stroke="white"/>
      <line x1="9.08545" y1="28.7563" x2="9.08545" y2="8.58525e-05" stroke="white"/>
      </svg>
    </div>
  )
}

export default ScrollDown
