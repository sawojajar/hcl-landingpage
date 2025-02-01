import { RootProvider } from '@/provider/RootProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.pathname
  return <RootProvider>
    <Component {...pageProps} />
  </RootProvider>
  return
}
