import React from 'react'
import  Header  from "./header";
import NextHead from "./head"
import Footer from "./footer";
import { useRouter } from 'next/router';
import SmoothScrolling from "./animations/SmoothScrolling";
import { useState, useEffect, useContext } from 'react';
import Preloader from "./Animations/preloader";
import PreloaderCtx from '../../context/preloaderContext';

const Layout = ({ children, altLangs, menu, meta, settings }) => {

  const preloaderCtx = useContext(PreloaderCtx);


  return (
    <>
        <NextHead meta={meta} settings={settings}/>

        {!preloaderCtx.end && <Preloader/>}

       
          <Header altLangs={altLangs} settings={settings}/>

          <SmoothScrolling>
            
   
           <div className={`page_container ${useRouter().pathname === "/" ? "" : "px-[16px] md:px-4"} min-h-screen bg-white`}>
            {children}
           </div>

          </SmoothScrolling>   

        <Footer altLangs={altLangs} settings={settings}/>

    </>
  );
};

export default Layout;