import React from "react";
import { PrismicLink } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import FadeStagger from "./Animations/FadeStagger";
const Footer = ({ settings }) => {
  const { data } = settings;
  console.log(data, "ciao");

  return (
    <footer className="md:h-5 h-4 left-0 w-full bg-red-500 md:px-4 px-1 flex items-center justify-between font-secondary md:static fixed bottom-0 bg-white z-50">

      <div className="flex-1 md:flex hidden tracking-wider">
        <PrismicRichText field={data.indirizzo} />
      </div>

      <div className="flex-1 flex md:justify-center tracking-wider">
        <PrismicLink
          target="_blank"
          rel="noopener noreferrer"
          href={data.link_prenota}
          className="md:text-sm text-[18px]  flex justify-end cursor-pointer hover:opacity-50 transition-all duration-300"
        >
          {data.link_prenota.text}
        </PrismicLink>
      </div>

      <div className="flex-1 justify-end md:flex hidden tracking-wider">
        <ul className="md:flex hidden gap-2 text-sm">
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
      </div>

    </footer>
  );
};

export default Footer;
