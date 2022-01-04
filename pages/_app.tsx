import { GlobalProvider } from '@context/Global'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import { Middleware } from '@components/Middleware'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Middleware>
        <Component {...pageProps} />
      </Middleware>
    </GlobalProvider>
  )
}

export default MyApp
