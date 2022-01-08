import { GlobalProvider } from '@context/Global'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import { Middleware } from '@components/Middleware'
import axios from 'axios'
import config from 'config'

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = config.API_URL_CARBON;

  return (
    <GlobalProvider>
      <Middleware>
        <Component {...pageProps} />
      </Middleware>
    </GlobalProvider>
  )
}

export default MyApp
