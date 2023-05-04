import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { withRainbowKitProvider } from '@/config/rainbowkit';
import useLayout from '@/hooks/useLayout';
import { ThemeProvider } from 'next-themes';

function App({ Component, pageProps, router }: AppProps) {
  const pathroot = router.pathname.split('/')[1]
  const Layout = useLayout(pathroot)

  return (
    <ThemeProvider defaultTheme='light' attribute='class'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default withRainbowKitProvider(App)