import '@/app/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { ReactQueryProvider } from './providers/react-query'
const montseratt = Montserrat({ subsets: ['latin'] })

export function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <div className={montseratt.className}>
        <Component {...pageProps} />
      </div>
    </ReactQueryProvider>
  )
}
