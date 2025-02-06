import React, { useState, useMemo } from 'react';
import { createClient } from "../../prismicio";
import Layout from "../../components/layout";
import { getLocales } from '../../../helpers/getLocales';
import Link from 'next/link';
import { PrismicNextImage } from '@prismicio/next';
export default function Collezioni({collezioni, settings, locales}) {

const {data} = settings;

const [selectedTag, setSelectedTag] = useState(null);

  // Estrai tutti i tag unici dalle collezioni
  const uniqueTags = useMemo(() => {
    const allTags = collezioni.flatMap(item => item.tags || []);
    return [...new Set(allTags)].filter(Boolean);
  }, [collezioni]);

  // Filtra le collezioni in base al tag selezionato
  const filteredCollezioni = useMemo(() => {
    if (!selectedTag) return collezioni;
    return collezioni.filter(item => 
      item.tags && item.tags.includes(selectedTag)
    );
  }, [collezioni, selectedTag]);

  return (
     <Layout
      settings={settings}
      meta={data}
      altLangs={locales}
     >

      <div className="flex min-h-screen pt-8 pb-2">

          <div className="w-[30%]">
            <div className="sticky top-[50vh] -translate-y-1/2 pr-8 text-grey">
            <div className="flex flex-col gap-2">
              <button 
                className={`text-left hover:opacity-70 ${!selectedTag ? 'font-bold' : ''}`}
                onClick={() => setSelectedTag(null)}
              >
                Tutti
              </button>
              {uniqueTags.map((tag, index) => (
                <button
                  key={index}
                  className={`text-left hover:opacity-70 ${selectedTag === tag ? 'font-bold' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            </div>
          </div>
          
          <div className="w-[70%] grid grid-cols-3 gap-1">
            <div className="flex flex-col gap-1">
            {filteredCollezioni.map((item, i) => (
              <Link key={i} href={`/collezione/${item.uid}`}>
              <div key={i} className="w-full">
                <div className="relative w-full group overflow-hidden aspect-4-5">
                  <div className="absolute w-full h-full top-0 left-0">
                    <PrismicNextImage
                      field={item.data.cover_01}
                      className="object-cover w-full h-full"
                    />
                    <PrismicNextImage 
                      field={item.data.cover_02}
                      className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                    />
                  </div>
                </div>
                <div className="text-grey leading-none py-1 text-s">
                    <p>{item.data.didascalia}</p>
                </div>
              </div>
            </Link>
             
            ))}
            </div>
          </div>
      </div>
       
    </Layout>
  )
}


export async function getStaticProps({ params, locale, previewData }) {

  const client = createClient({ previewData });

  try{

    const collezioni = await client.getAllByType("oggetto",{ lang: locale});

    const settings = await client.getSingle("settings",{ lang: locale});

    // const locales = await getLocales(collezioni, client)


    if (!collezioni || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        collezioni,
        settings,
        // locales, 
      },
    };

  }
  catch(e){
    console.log(e)
    return { notFound: true };
  }
}