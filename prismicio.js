import * as prismic from "@prismicio/client";
import * as prismicNext from '@prismicio/next'
import * as prismicH from '@prismicio/helpers'
import sm from "./slicemachine.config.json";

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);


export const linkResolver = (doc) => {

  if(doc.type == "homepage"){
    return `/`
  }

  if(doc.type == "page"){
    return `/page/${doc.uid}`
  }

  return "/";
};

// This factory function allows smooth preview setup
export const createClient = ({ previewData, req, ...config } = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, config);

  prismicNext.enableAutoPreviews({ client, previewData, req });

  return client;
};

