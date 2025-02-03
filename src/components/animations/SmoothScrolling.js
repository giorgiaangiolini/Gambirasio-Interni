import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";
import Tempus from "@studio-freight/tempus"
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useIsomorphicLayoutEffect } from "../../../helpers/isomorphicEffect";
import Router from "next/router"
import { useLenis } from "@studio-freight/react-lenis"


if (typeof window !== "undefined") {
  window.scrollTo(0, 0)
  window.history.scrollRestoration = "manual"
}

function SmoothScrolling({ children }) {

  const lenis = useLenis(ScrollTrigger.update)
  useEffect(ScrollTrigger.refresh, [lenis])

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.defaults()

    // merge rafs
    gsap.ticker.lagSmoothing(0)
    gsap.ticker.remove(gsap.updateRoot)
    Tempus.add((time) => {
      gsap.updateRoot(time / 1000)
    }, 0)

    // reset scroll position
    window.scrollTo(0, 0)
    window.history.scrollRestoration = "manual"
  }, [])

  useEffect(() => {
    function onHashChangeStart(url) {
      url = "#" + url.split("#").pop()
      lenis.scrollTo(url)
    }

    Router.events.on("hashChangeStart", onHashChangeStart)

    return () => {
      Router.events.off("hashChangeStart", onHashChangeStart)
    }
  }, [lenis])


  return (
    <ReactLenis  root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;