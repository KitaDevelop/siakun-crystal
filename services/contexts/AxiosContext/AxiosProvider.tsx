import React from "react"
import { AxiosInstance, default as Axios } from "axios"
import config from "config"

interface AxiosContextValue {
  axios: AxiosInstance
  setToken: (token: string) => void
}

export const AxiosContext = React.createContext<AxiosContextValue | undefined>(undefined)

export default function AxiosProvider({ children }: React.PropsWithChildren<unknown>) {
  const [token, setToken] = React.useState('')
  const axios = React.useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: config.API_URL_CARBON,
    })

    axios.interceptors.request.use((config) => {
      if (token) {
        console.log("masuk", token)
        config.headers.Authorization = `Bearer ${token}`
        config.withCredentials = true
      } else {
        config.headers.Authorization = null
        config.withCredentials = false
      }

      return config
    })

    return axios
  }, [token])

  const value = { axios, setToken }

  return (
    <AxiosContext.Provider value={value}>
      {children}
    </AxiosContext.Provider>
  )
}

export function useAxios() {
  const context = React.useContext(AxiosContext)
  if (context === undefined) {
    throw new Error('useAxios must be used within a AxiosProvider')
  }
  return context
}
