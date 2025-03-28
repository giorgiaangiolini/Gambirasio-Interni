import React, { useRef, useState, useContext } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "../../../helpers/isomorphicEffect";
import PreloaderCtx from "../../../context/preloaderContext";
import { useGSAP } from "@gsap/react";
import { PrismicRichText } from "@prismicio/react";
import { useRouter } from "next/router";
import TextAnimationHeading from "./HeadingAnimation";
import { CustomEase } from "gsap/dist/CustomEase.js";
import { SplitText } from "gsap/dist/SplitText.js";

if (typeof window !== "undefined"){
  gsap.registerPlugin(CustomEase)
  gsap.registerPlugin(SplitText)
}

function Preloader({settings}) {
  const [showPreloader, setShowPreloader] = useState(true);
  const preloaderCtx = useContext(PreloaderCtx);

  const preloader = useRef();
  const tl = useRef();

const router = useRouter();

  useGSAP(()=>{
    // Check if preloader has been shown before using localStorage
    const hasSeenPreloader = localStorage.getItem('preloaderShown');
    
    if (hasSeenPreloader) {
      // Skip animation and hide preloader immediately
      preloader.current.style.display = 'none';
      preloaderCtx.SetOpenFc();
      return;
    }

    // Set localStorage to remember preloader has been shown
    localStorage.setItem('preloaderShown', 'true');

    CustomEase.create("logoEase", "M0,0 C0.45,0.05 0,1 1,1");

    let split = SplitText.create(".testo_preloader", {
      type: "line,words,chars",
      wordsClass: "split-line-custom",
    });
    let words = split.chars ;
 

    // Create main timeline
    tl.current = gsap
      .timeline()

      .to(".testo_preloader", {
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      })

          
            .fromTo(
              words,
              {
                y: 0,
                autoAlpha: 0,
              },
              {
                y: 0,
                duration: 0.5,
                autoAlpha: 1,
                delay: 0.5,
                ease: "titleEase",
                stagger: 0.01,
              }
            )

            .to(".logo", {
              transform: "translateY(0)",
              duration: 1.5,
              delay: -0.5,
              ease: "logoEase",
            })

            // .to(".path_1", {
            //   opacity: 1,
            //   duration: 1,
            //   delay: 0,
            //   ease: "power2.inOut"
            // })
            .to(".path_2", {
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
            })
            // .to(preloader.current, {
            //   backgroundColor: "rgba(255,254,247,0)",
            //   duration: 1,
            //   delay: 1,
            //   ease: "power2.inOut",
            //   onComplete: () => {
            //     preloaderCtx.SetOpenFc();
            //   }
            // })
            .to(".testo_preloader", {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            })
            .to(".background", {
              y: "-100%",
              duration: 1,
              delay: -0.5,
              ease: "power2.inOut",
            })
            .to(".logo", {
              opacity: 0,
              duration: 0.5,
              delay: -0.5,
              ease: "power2.inOut",
            })
            .set(preloader.current, {
              display: "none",
              onComplete: () => {
                preloaderCtx.SetOpenFc();
              },
            });

  },{ dependencies: [], scope: preloader })



  return (
    <div
      ref={preloader}
      className="preloader bg-transparent  fixed top-0 h-screen w-screen z-[9999] opacity-100 md:px-4 px-1"
    >
      <div className="background h-screen w-screen  absolute top-0 left-0 z-10 bg-white"></div>

      <div className="preloader_container h-screen v-screen relative">
        {router.pathname === "/" ? (
          <div className="md:absolute fixed md:w-1/2 w-[calc(100vw-20px)] md:h-full h-auto md:left-0 left-1 md:top-0 top-auto bottom-2  flex items-center justify-center  max-w-md md:text-base text-sm  z-20">
            <h2 className="testo_preloader opacity-0">{settings.data.testo}</h2>
          </div>
        ) : null}

        <div className="absolute top-0 w-full h-full logo_preloader flex justify-center items-center z-30 ">
          <div className="md:w-[220px] w-[120px] max-w-full md:translate-y-[65vh] translate-y-[-90vh] logo">
            <svg
              width="332"
              height="422"
              viewBox="0 0 332 422"
              fill="none"
              className="w-full h-auto  "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="path_1 opacity-100"
                d="M174.204 315C160.004 315 146.104 312.3 132.504 306.9C112.704 299.1 96.8043 286.1 84.8043 267.9C72.8043 249.7 66.8043 228.4 66.8043 204C66.8043 180.6 72.7043 159.5 84.5043 140.7C96.3043 121.7 112.404 108.1 132.804 99.9C144.404 95.3 157.104 93 170.904 93C181.104 93 192.504 94.9 205.104 98.7C206.104 98.9 208.304 99.5 211.704 100.5C215.104 101.3 218.004 101.7 220.404 101.7C224.004 101.7 226.404 100.6 227.604 98.4C228.804 96.2 229.204 93 228.804 88.8H229.704L264.204 154.2H263.004C256.204 146 248.704 138.1 240.504 130.5C232.304 122.9 224.004 116.5 215.604 111.3C207.604 106.5 200.004 102.8 192.804 100.2C185.804 97.4 178.504 96 170.904 96C158.504 96 147.004 99.5 136.404 106.5C123.604 114.9 113.604 127.7 106.404 144.9C99.2043 161.9 95.6043 181.6 95.6043 204C95.6043 226 99.1043 245.5 106.104 262.5C113.304 279.3 123.304 292 136.104 300.6C147.304 308.2 160.004 312 174.204 312C200.204 312 218.204 303.7 228.204 287.1C234.804 276.1 238.104 262.1 238.104 245.1C238.104 235.7 236.604 228.3 233.604 222.9C230.604 217.5 225.604 213.8 218.604 211.8V210.9H266.304V211.8C261.704 214 259.404 220.8 259.404 232.2V270C259.404 274.6 260.204 278.1 261.804 280.5C263.604 282.7 266.404 283.9 270.204 284.1V285C257.404 294.2 242.304 301.5 224.904 306.9C207.504 312.3 190.604 315 174.204 315Z"
                fill="#020728"
              />
              <path
                className="path_2 opacity-0"
                d="M218.162 192.901C218.624 192.747 218.976 192.472 219.218 192.076C219.46 191.68 219.581 191.174 219.581 190.558V173.992C219.581 173.398 219.471 172.958 219.251 172.672C219.053 172.386 218.679 172.243 218.129 172.243C217.711 172.243 217.205 172.32 216.611 172.474V172.342L223.112 169.372V169.504C222.914 169.658 222.771 169.867 222.683 170.131C222.595 170.373 222.551 170.714 222.551 171.154V190.789C222.551 191.449 222.628 191.933 222.782 192.241C222.936 192.527 223.167 192.747 223.475 192.901V193H218.162V192.901ZM235.469 169.405C237.933 169.405 239.825 170.307 241.145 172.111C242.487 173.915 243.158 176.412 243.158 179.602C243.158 182 242.685 184.255 241.739 186.367C240.793 188.457 239.44 190.14 237.68 191.416C235.942 192.692 233.918 193.33 231.608 193.33C230.97 193.33 230.409 193.286 229.925 193.198V193.066C233.819 193.242 236.481 192.098 237.911 189.634C239.363 187.17 240.089 183.793 240.089 179.503C240.089 178.799 240.078 178.293 240.056 177.985C239.638 179.085 238.934 179.987 237.944 180.691C236.954 181.373 235.843 181.714 234.611 181.714C233.511 181.714 232.499 181.472 231.575 180.988C230.673 180.504 229.958 179.811 229.43 178.909C228.902 178.007 228.638 176.962 228.638 175.774C228.638 174.564 228.913 173.475 229.463 172.507C230.035 171.539 230.838 170.78 231.872 170.23C232.906 169.68 234.105 169.405 235.469 169.405ZM235.37 180.922C236.8 180.922 237.878 180.449 238.604 179.503C239.33 178.557 239.693 177.292 239.693 175.708C239.693 173.882 239.33 172.43 238.604 171.352C237.9 170.252 236.855 169.702 235.469 169.702C234.083 169.702 233.016 170.241 232.268 171.319C231.542 172.375 231.179 173.794 231.179 175.576C231.179 177.182 231.553 178.48 232.301 179.47C233.049 180.438 234.072 180.922 235.37 180.922ZM255.574 178.81C257.51 179.426 258.951 180.383 259.897 181.681C260.843 182.979 261.316 184.508 261.316 186.268C261.316 187.632 261.03 188.853 260.458 189.931C259.886 190.987 259.072 191.823 258.016 192.439C256.982 193.033 255.794 193.33 254.452 193.33C253.814 193.33 253.253 193.275 252.769 193.165C252.285 193.077 251.757 192.956 251.185 192.802C251.075 192.78 250.877 192.736 250.591 192.67C250.305 192.582 250.063 192.538 249.865 192.538C249.601 192.538 249.392 192.626 249.238 192.802C249.084 192.956 248.974 193.275 248.908 193.759H248.809L247.126 186.961H247.225C247.995 188.567 249.018 189.964 250.294 191.152C250.976 191.79 251.647 192.263 252.307 192.571C252.989 192.857 253.704 193 254.452 193C255.926 193 257.103 192.494 257.983 191.482C258.863 190.448 259.303 189.15 259.303 187.588C259.303 185.916 258.698 184.475 257.488 183.265C256.278 182.055 254.419 181.054 251.911 180.262V180.163C253.847 179.591 255.255 178.843 256.135 177.919C257.015 176.995 257.455 175.697 257.455 174.025C257.455 172.749 257.224 171.748 256.762 171.022C256.3 170.274 255.629 169.9 254.749 169.9C253.737 169.9 252.747 170.318 251.779 171.154C250.789 172.012 249.766 173.475 248.71 175.543H248.611L250.162 169.141H250.261C250.327 169.625 250.437 169.955 250.591 170.131C250.767 170.285 250.998 170.362 251.284 170.362C251.548 170.362 251.933 170.263 252.439 170.065C253.231 169.735 254.001 169.57 254.749 169.57C256.157 169.57 257.323 169.944 258.247 170.692C259.193 171.44 259.666 172.518 259.666 173.926C259.666 175.136 259.303 176.148 258.577 176.962C257.873 177.776 256.872 178.392 255.574 178.81ZM275.098 180.724C276.902 180.724 278.376 181.263 279.52 182.341C280.664 183.397 281.236 184.838 281.236 186.664C281.236 187.984 280.95 189.161 280.378 190.195C279.828 191.229 279.014 192.043 277.936 192.637C276.88 193.209 275.626 193.495 274.174 193.495C272.524 193.495 271.094 193.099 269.884 192.307C268.674 191.493 267.75 190.36 267.112 188.908C266.474 187.434 266.155 185.718 266.155 183.76C266.155 181.318 266.683 179.019 267.739 176.863C268.795 174.685 270.225 172.936 272.029 171.616C273.855 170.296 275.857 169.636 278.035 169.636C278.387 169.636 278.673 169.658 278.893 169.702V169.801C276.759 169.845 274.966 170.505 273.514 171.781C272.062 173.035 270.984 174.707 270.28 176.797C269.576 178.887 269.224 181.197 269.224 183.727C269.224 184.189 269.235 184.552 269.257 184.816C269.719 183.606 270.489 182.627 271.567 181.879C272.645 181.109 273.822 180.724 275.098 180.724ZM274.174 193.198C275.626 193.198 276.737 192.659 277.507 191.581C278.299 190.481 278.695 189.018 278.695 187.192C278.695 185.498 278.31 184.134 277.54 183.1C276.792 182.044 275.747 181.516 274.405 181.516C272.887 181.516 271.71 182.033 270.874 183.067C270.06 184.101 269.653 185.476 269.653 187.192C269.653 188.996 270.049 190.448 270.841 191.548C271.655 192.648 272.766 193.198 274.174 193.198Z"
                fill="#020728"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
