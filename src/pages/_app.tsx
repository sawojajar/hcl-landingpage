import { RootProvider } from '@/provider/RootProvider'
import '@/styles/globals.css'
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app'

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default function App({ Component, pageProps }: AppProps) {
  const enableIndexingSEO = publicRuntimeConfig.enableIndexingSEO;

  return <RootProvider>
    <DefaultSeo
      title="HCL Pump - Pompa Air Terbaik untuk Kebutuhan Anda"
      description="Mengalir Tanpa Henti, Menghubungkan Indonesia dengan solusi pompa yang andal, tahan lama, dan inovatif untuk berbagai aplikasi, dari irigasi hingga pengolahan air limbah sejak 2019."
      dangerouslySetAllPagesToNoIndex={!enableIndexingSEO}
      dangerouslySetAllPagesToNoFollow={!enableIndexingSEO}
    />
    <Component {...pageProps} />
  </RootProvider>
  return
}
