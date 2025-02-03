
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-brown">
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Head>
      <h1 className="font-bold mb-2">404</h1>
      <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link className='underline font-bold' href="/">
          Go back home
      </Link>
    </div>
  )
}
