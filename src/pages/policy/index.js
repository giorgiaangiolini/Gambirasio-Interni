import React, { useContext, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Script from 'next/script';
import * as prismic from "@prismicio/client"
import { createClient } from "../../../prismicio";
import Layout from '@/components/layout';
import { useRouter } from "next/router"


export default function Policy({settings}) {
  const router = useRouter()

  return (
      <section className='section_policy'>

        <div onClick={() => router.back()} className='bg-black p-[5px] back-btn fixed bottom-2 left-2 uppercase text-white rounded-sm'>
          ← BACK
        </div>

        <div className='p-2'>
        <Script strategy="afterInteractive" id="CookieDeclaration" src="https://consent.cookiebot.com/3edcb1e9-e0d6-43e6-b33a-babf82897cd5/cd.js" type="text/javascript" async></Script>
        </div>
       
      </section>
  )
}

export async function getStaticProps({ params, locale, previewData }) {

  const client = createClient({ previewData });

  try{

   const settings = await client.getSingle("settings",{ lang: locale});

    if (!settings) {
      return { notFound: true };
    }

    return {
      props: {
        settings
      },
    };

  }
  catch(e){
    console.log(e)
    return { notFound: true };
  }

}