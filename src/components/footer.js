import React from 'react'
import { PrismicLink } from '@prismicio/react';

const Footer = ({settings}) => {

  const {data} = settings;

  return (
  
    <footer className="h-5 left-0 w-full bg-red-500 px-5 flex items-center justify-between font-secondary">
    <ul className="flex gap-2">
      {settings.data.lista_link.map((item, i) => {
        return (
          <li key={i}>
            <PrismicLink field={item.link} className="text-blue">
              {item.link.text}
            </PrismicLink>
          </li>
        )
      })}
    </ul>

    <div className="">
    Via Monte S. Michele 1 - 24121, Bergamo - Tel: 035 247178
    </div>
  </footer>
  )
}

export default Footer
