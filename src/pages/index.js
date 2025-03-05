import React from "react";
import { createClient } from "../../prismicio";
import Layout from "../components/layout";
import { SliceZone } from "@prismicio/react";
import { getLocales } from "../../helpers/getLocales";
import { components } from "@/slices";
import Slideshow from "@/components/slideshow";
import FadeInAnimation from '@/components/Animations/FadeInAnimation';
import TextAnimationHeading from "@/components/Animations/HeadingAnimation";

export default function Home({ home, settings, locales }) {
  const { data } = home;

  return (
    <Layout settings={settings} meta={data} altLangs={home.alternate_languages}>
      <SliceZone
        slices={home.data.slices}
        context={settings}
        components={components}
      />
      <div className="flex md:items-center items-end justify-between md:px-4 px-1 md:absolute fixed md:top-0 top-auto bottom-2 left-0 w-full z-10 bg-transparent md:h-screen h-auto pointer-events-none">
        {/* <FadeIn> */}
        {/* <div className="text-grey max-w-md md:text-base text-sm">
          <TextAnimationHeading>
            {data.testo[0].text}
          </TextAnimationHeading>
        </div> */}
        {/* </FadeIn> */}
      </div>
      <div className="absolute h-screen w-screen top-0 left-0 flex items-center justify-center z-10 pointer-events-none">
        <div  className="md:w-[220px] w-[120px] rotate_animation">
          
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
