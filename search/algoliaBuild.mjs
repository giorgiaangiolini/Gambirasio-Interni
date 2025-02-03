import algoliasearch from "algoliasearch";
import * as Prismic from "@prismicio/client";
import fetch from "node-fetch";
import { PrismicError } from "@prismicio/client";

// prismic repo name
const repoName = process.env.NEXT_PUBLIC_PRISMIC_REPO;
// prismic main access token
const accessToken = process.env.PRISMIC_TOKEN;

export const prismicClient = Prismic.createClient(repoName, {
  fetch,
  accessToken,
});

// algolia app id
// algolia api key
const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_KEY);

const records = [];

for (const locale of [ 'en-gb', 'it-it' ]) {

  let allPosts;
 
  try {
    allPosts = await prismicClient.getAllByType("blogpost", {lang: locale});
  } catch (error) {
    console.error(error instanceof PrismicError)
  }

  // si potrebbero anche salvare i testi del body e l'immagine volendo
  const createBlogRecord = (post) => ({
    objectID: post.uid,
    slug: `blog/${post.uid}`,
    uid: post.uid,
    title: post.data.title[0].text
  });

  allPosts?.map((post) => {
    records.push(createBlogRecord(post));
  });
}

  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
  // whatever you want index name to be here
  const index = client.initIndex(indexName);
  
  index.replaceAllObjects(records, {}).then(() => {
    console.info(
      `Algolia Search: Successfully saved ${records.length} objects to index ${indexName}`
    );
  }).catch((error)=>{
    console.error(error)
  });