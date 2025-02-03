import React from 'react'
import  Header  from "./header";
import NextHead from "./head"
import Footer from "./footer";
import { useRouter } from 'next/router';
import SmoothScrolling from "./animations/SmoothScrolling";
import { useState, useEffect } from 'react';
const Layout = ({ children, altLangs, menu, meta, settings }) => {


  return (
    <>
        <NextHead meta={meta} settings={settings}/>
       
          <Header altLangs={altLangs} settings={settings}/>

          <SmoothScrolling>
            
            <div className='texture-background opacity-50'></div>
   
           <div className={`page_container`}>
            {children}
           </div>
          </SmoothScrolling>   

        <Footer altLangs={altLangs} settings={settings}/>

    </>
  );
};

export default Layout;