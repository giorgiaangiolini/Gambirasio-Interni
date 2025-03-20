import React from "react";
import { PrismicLink } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import FadeStagger from "./Animations/FadeStagger";
const Footer = ({ settings }) => {
  const { data } = settings;

  return (
    <footer className="md:h-5 h-4 left-0 w-full bg-red-500 md:px-4 px-1 flex items-center justify-between font-secondary md:static fixed bottom-0 bg-white z-50">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={settings.data?.link_codice_form || ''}
        className="md:text-sm text-[18px] md:hidden flex justify-end cursor-pointer hover:opacity-50 transition-all duration-300"
      >
        {settings.data?.bottone_contatti}
      </Link>

      <ul className="md:flex hidden gap-2 text-sm tracking-[0.07em]">
        {settings.data.lista_link.map((item, i) => {
          return (
            <li key={i}>
              <PrismicLink
                field={item.link}
                className="text-blue hover:opacity-50 transition-all duration-300"
              >
                {item.link.text}
              </PrismicLink>
            </li>
          );
        })}
      </ul>

      <div className="text-sm md:block hidden tracking-[0.07em]">
       
         <Link
              target="_blank"
              rel="noopener noreferrer"
              href={settings.data?.link_codice_form || ''}
              className="text-sm flex justify-end cursor-pointer hover:opacity-50 transition-all duration-300"
            >
              {settings.data?.bottone_contatti}
            </Link>
      </div>
    </footer>
  );
};

export default Footer;
