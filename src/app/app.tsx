import '@/app/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat as FontSans } from 'next/font/google'
import { ReactQueryProvider } from './providers/react-query'
import { cn } from '@/shared/lib'
import { Toaster } from '@/shared/ui/components/ui/toaster'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <div
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Component {...pageProps} />
        <Toaster />
      </div>
    </ReactQueryProvider>
  )
}
