import * as prismic from "@prismicio/client";
import * as prismicNext from '@prismicio/next'
import * as prismicH from '@prismicio/helpers'
import sm from "./slicemachine.config.json";

export const endpoint = sm.apiEndpoint;
export const repositoryName = prismic.getRepositoryName(endpoint);


export const linkResolver = (doc) => {

  const langPrefix = doc.lang === 'it-it' ? '': doc.lang === 'en-gb' ? '/en-gb' : '';

  if(doc.type == "homepage"){
    return `${langPrefix}/`
  }

  if(doc.type == "contatti"){
    return `${langPrefix}/contatti`
  }

  if(doc.type == "storia"){
    return `${langPrefix}/storia`
  }

  if(doc.type == "servizi"){
    return `${langPrefix}/servizi`
  }

  if(doc.type == "progetto"){
    return `${langPrefix}/progettazione/${doc.uid}`
  }

  if(doc.type == "oggetto"){
    return `${langPrefix}/collezioni/${doc.uid}`
  }

  return "/";
};

// This factory function allows smooth preview setup
export const createClient = ({ previewData, req, ...config } = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, config);

  prismicNext.enableAutoPreviews({ client, previewData, req });

  return client;
};

