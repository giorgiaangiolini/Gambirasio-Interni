// customBounceEase.js
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

// Crea un ease personalizzato che simula un leggero rimbalzo
CustomEase.create("customBounce", "M0,0 C0.14,0 0.27,0.191 0.33,0.408 0.381,0.564 0.421,0.923 0.476,1.013 0.519,1.087 0.613,0.863 0.658,0.824 0.717,0.772 0.724,0.937 0.758,0.947 0.819,0.964 0.872,0.937 0.91,0.937 0.957,0.937 1,1 1,1");

export const customBounceConfig = {
  ease: "customBounce",
  duration: 1.2
};