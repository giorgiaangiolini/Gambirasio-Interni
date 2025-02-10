import React from "react";
import { createClient } from "../../prismicio";
import { renderToStaticMarkup } from "react-dom/server";
import { linkResolver } from "../../prismicio";
const SitemapIndex = () => null;


const Sitemap = ({ pages }) => {

  const origin = "https://www.gambirasiointerni.it/";
  return (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      {pages?.map((page, index) => {
        const lastModified = new Date(page.last_publication_date).toISOString();
        
        // Handle homepage for both languages
        if (page.type === "homepage") {
          const url = origin + linkResolver(page);
          return (
            <url key={index}>
              <loc>{url}</loc>
              <lastmod>{lastModified}</lastmod>
              <changefreq>daily</changefreq>
              <priority>1.0</priority>
            </url>
          );
        }

        // Handle all other pages
        if (linkResolver(page) !== "/" ) {
          const url = origin + linkResolver(page);
          return (
            <url key={index}>
              <loc>{url}</loc>
              <lastmod>{lastModified}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          );
        }
        return null;
      })}
    </urlset>
  );
};

export const getServerSideProps = async ({ res }) => {
  try {
    const client = createClient();
    const pages = await client.dangerouslyGetAll({
      lang: '*' 
    })    
    // Generate the XML
    const xml = renderToStaticMarkup(
      <Sitemap pages={pages} />
    );
    
    // Set headers and send response
    res.setHeader('Content-Type', 'text/xml');
    res.write('<?xml version="1.0" encoding="UTF-8"?>');
    res.write(xml);
    res.end();
    
    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.statusCode = 500;
    res.end();
    return {
      props: {},
    };
  }
};

export default SitemapIndex;