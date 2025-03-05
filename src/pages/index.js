import React from "react";
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { SliceZone } from "@prismicio/react";
import { getLocales } from "../../helpers/getLocales";
import { components } from "@/slices";
import Slideshow from "@/components/slideshow";
import FadeInAnimation from '@/components/Animations/FadeInAnimation';
import TextAnimationHeading from "@/components/Animations/HeadingAnimation";
import Link from "next/link";
import { PrismicLink } from "@prismicio/react";
export default function Home({ home, settings, locales }) {
  const { data } = home;

  console.log(settings, "ciao")

  return (
    <Layout settings={settings} meta={data} altLangs={home.alternate_languages}>
      <SliceZone
        slices={home.data.slices}
        context={settings}
        components={components}
      />
     
    <div className="h-5 absolute bottom-0 left-0 w-full bg-red-500 px-6 flex items-center justify-between font-secondary">
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
    </div>

    </Layout>
  );
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  try {
    const home = await client.getSingle("homepage", { lang: locale });

    const settings = await client.getSingle("settings", { lang: locale });

    if (!home || !settings) {
      return { notFound: true };
    }

    return {
      props: {
        home,
        settings,
      },
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
}
