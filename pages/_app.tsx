import { GlobalProvider } from '@context/Global'
import { AppProps } from 'next/app'
import router from 'next/router'
import { useEffect, useState } from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [authorized, setAuthorized] = useState(true)

  useEffect(() => {
    if (!authorized) router.push('/login')
  }, [authorized])

  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp
