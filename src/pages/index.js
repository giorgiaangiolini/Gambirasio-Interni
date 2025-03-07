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


  return (
    <Layout settings={settings} meta={data} altLangs={home.alternate_languages}>
      <SliceZone
        slices={home.data.slices}
        context={settings}
        components={components}
      />
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
