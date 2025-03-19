import React from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import * as prismicH from "@prismicio/helpers";
import { useRouter } from 'next/router';

const NextHead = ({meta, settings}) => {

  const router = useRouter()

  const {data} = settings;

  const {meta_title, meta_description, meta_image } = (meta) ? (meta) : {};

  const title = meta_title ? (meta_title) : (data.meta_title);

  const description = meta_description ? (meta_description) : (data.meta_description) ;

  const url =  prismicH.isFilled.image(meta_image) ? (meta_image.url) : (data.meta_image.url);

  const width = prismicH.isFilled.image(meta_image)  ? (meta_image.dimensions.width) : (data.meta_image.dimensions.width);

  const height =  prismicH.isFilled.image(meta_image) ? (meta_image.dimensions.height) : (data.meta_image.dimensions.height);

  return (
    <>
      <Head>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="Gambirasio" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href={`https://www.gambirasiointerni.it${router.asPath}`} />
      </Head>
      
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: `https://www.gambirasiointerni.it`,
          title,
          description,
          images: [
            {
              url,
              width,
              height,
              alt: "meta image",
            },
          ],
        }}
      />

     </> 
 
  )
}

export default NextHead;
