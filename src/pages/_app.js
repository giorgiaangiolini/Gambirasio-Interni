import {useRef, useEffect} from "react"
import { useRouter } from 'next/router';
import Link from "next/link";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, linkResolver } from "../../prismicio";
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'
import { PreloaderCtxProvider } from "../../context/preloaderContext";
import TransitionComponent from '../components/Animations/transition';
const helvetica = localFont({
  src: [
    {
      path: '../../public/fonts/helvetica-md.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica-rg.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/helvetica-it.woff',
      weight: '400',
      style: 'italic',
    }
  ],
})

import '@/styles/customstyle.scss'
import '@/styles/globals.scss'


const richTextComponents = {
  heading1: ({ children }) => <h1 className="font-regular md:text-xl text-md2 font-normal leading-tight">{children}</h1>,
  heading2: ({ children }) => <h2 className="font-regular md:text-lg text-md2">{children}</h2>,
  heading3: ({ children }) => <h3 className="font-regular text-md2">{children}</h3>,
  heading4: ({ children }) => <h4 className="font-regular text-md">{children}</h4>,
  heading5: ({ children }) => <h5 className="font-regular heading_h5 md:text-lg text-md2">{children}</h5>,
  paragraph: ({ children }) => <p className="font-regular text-base leading-relaxed">{children}</p>,
  oList: ({ children }) => (
    <ol className="ordered-list">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="ordered-list-li">{children}</li>
  ),
  list: ({ children }) => (
    <ul className="unordered-list">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li>{children}</li>
  ),
  preformatted: ({ children }) => (
    <pre className="">
      <code>{children}</code>
    </pre>
  ),
  em: ({ children }) => (
    <em className="font-italic">{children}</em>
  ),
  strong: ({ children }) => (
    <strong className="font-medium break-words">{children}</strong>
  ),
  hyperlink: ({ children, node }) => {
    return (
      <PrismicLink
      field={node.data}
      className="rich-link underline"
    >
      {children}
    </PrismicLink>
    )
  }
 ,
 image: ({ node, key }) => {
  const img = (
    <img
      src={node.url}
      alt={node.alt ?? undefined}
      data-copyright={node.copyright ? node.copyright : undefined}
    />
  )
  
  return (
    <p key={key} className="block-img">
      {node.linkTo ? (
        <PrismicLink
          field={node.linkTo}
        >
          {img}
        </PrismicLink>
      ) : (
        img
      )}
    </p>
  )
},
  embed: ({ node, key }) => (
    <div className="custom-aspect-video">
      <div
      key={key}
      data-oembed={node.oembed.embed_url}
      data-oembed-type={node.oembed.type}
      data-oembed-provider={node.oembed.provider_name}
      dangerouslySetInnerHTML={{ __html: node.oembed.html ?? '' }}
    />
    </div>
   
  ),
};

const NextLinkShim = ({ href, children, locale, ...props }) => {
  return (
    <Link href={href} locale={locale} {...props}>
      {children}
    </Link>
  );
};

export default function App({ Component, pageProps }) {

  const router = useRouter();

 
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      richTextComponents={richTextComponents}
      internalLinkComponent={NextLinkShim}
    >
      <PreloaderCtxProvider>
      <PrismicPreview repositoryName={repositoryName}> 


        <style jsx global>{`
          :root {
            /* ... */
              --helvetica-font: ${helvetica.style.fontFamily};
            }
        `}</style>

        
        {/* <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG} /> */}
   
          <TransitionComponent>
         <Component {...pageProps} />
         </TransitionComponent>
        
      </PrismicPreview>
      </PreloaderCtxProvider>
    </PrismicProvider>
  )
}


