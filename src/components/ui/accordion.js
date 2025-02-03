import React, { useState } from 'react';
import { PrismicLink, PrismicText, PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";


const Accordion = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item px-2 py-2 mt-1 pb-0 md:hidden">
      
      <div className={(isActive ? ("active"): ("")) + " accordion-title flex justify-between items-center group uppercase"} onClick={() => setIsActive(!isActive)}>
          {title}

          <svg className='group-[.active]:rotate-90 transition-all duration-300' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line y1="12.5" x2="25" y2="12.5" stroke="black"/>
          <line x1="13.5" y1="2.18557e-08" x2="13.5" y2="25" stroke="black"/>
          </svg>

      </div>

      {isActive && <div className="accordion-content mt-2">
          {children}
      </div>}
    </div>
  );
};

export default Accordion;