import '@/styles/globals.css'
import { cal, inter } from "@/styles/fonts";
import type { AppProps } from 'next/app'
import cx from "classnames";

export default function App({ Component, pageProps }: AppProps) {
  return <main className={cx(cal.variable, inter.variable)}>
    <Component {...pageProps} />
  </main>
}
