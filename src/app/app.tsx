import '@/app/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { AppProvider } from './app-providers'
const montseratt = Montserrat({ subsets: ['latin'] })

export function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className={montseratt.className}>
        <Component {...pageProps} />
      </div>
    </AppProvider>
  )
}
