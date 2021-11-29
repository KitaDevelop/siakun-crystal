import { createContext, useMemo } from "react"
import { AxiosInstance, default as Axios } from "axios"
import Cookies from 'js-cookie'
import config from "config"

export const AxiosContext = createContext<AxiosInstance | undefined>(undefined)

export default function AxiosProvider({ children }: React.PropsWithChildren<unknown>) {
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: config.API_URL_CARBON,
    })

    axios.interceptors.request.use((config) => {
      const token = Cookies.get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    return axios
  }, [])

  return (
    <AxiosContext.Provider value={axios}>
      {children}
    </AxiosContext.Provider>
  )
}
