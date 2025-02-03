// pages/api/revalidate.js

import * as prismic from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'

import { linkResolver } from '../../../prismicio'


export default async function handler(req, res) {
  if (req.body.type === 'api-update' && req.body.documents.length > 0) {

    if (req.body.secret !== process.env.PRISMIC_WEBHOOK_SECRET) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const prismicRepoName = process.env.NEXT_PUBLIC_PRISMIC_REPO
    const client = prismic.createClient(prismicRepoName)

    // Get a list of URLs for any new, updated, or deleted documents
    const documents = await client.getAllByIDs(req.body.documents)

    const urls = documents.map((doc) => prismicH.asLink(doc, linkResolver))

    try {
      // Revalidate the URLs for those documents
      await Promise.all(
        urls.map(async (url) => await res.revalidate(url))
      )

      return res.json({ revalidated: true })
    } catch (err) {
      return res.status(500).send('Error revalidating')
    }
  }

  return res.status(400).json({ message: 'Invalid body' })
}