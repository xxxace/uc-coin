import '@/styles/globals.css'
import { cal, inter } from "@/styles/fonts";
import type { AppProps } from 'next/app'
import cx from "classnames";
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from '@/config/MDXComponents';
import { withRainbowKitProvider } from '@/config/rainbowkit'
import { useEffect, useState } from 'react';

function App({ Component, pageProps, router }: AppProps) {
  const [mdxClass, setMdxClass] = useState('')

  useEffect(() => {
    router.pathname.indexOf('/doc/') === 0 && setMdxClass('container relative md:max-w-3xl py-6 lg:py-10 mx-auto px-4')
  }, [router.pathname])

  return (
    <MDXProvider components={MDXComponents}>
      <NavBar />
      <main className={cx(cal.variable, inter.variable, mdxClass)}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </MDXProvider>
  )
}

export default withRainbowKitProvider(App)