const prismic = require("@prismicio/client");
const sm = require("./slicemachine.config.json");
const path = require("path");


/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


const nextConfig = async () =>  {
  const client = prismic.createClient(sm.apiEndpoint);

  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);
  
  return {
    i18n: {
      locales,
      defaultLocale: locales[0],
      localeDetection: false,
    },
    images: {
      loader: "imgix",
      path: "",
      domains: ["images.prismic.io"],
    },
    async rewrites() {
      return [
        {
          source: '/projects', 
          destination: '/progettazione', 
        },
        {
          source: '/projects/:slug', 
          destination: '/progettazione/:slug', 
        },
        {
          source: '/collection', 
          destination: '/collezione', 
        },
        {
          source: '/collection/:slug', 
          destination: '/collezione/:slug', 
        },
          {
            source: '/services', 
            destination: '/servizi', 
          },
        {
          source: '/contact', 
          destination: '/contatti', 
        }
      ]
    },
  };
};


module.exports = nextConfig;
