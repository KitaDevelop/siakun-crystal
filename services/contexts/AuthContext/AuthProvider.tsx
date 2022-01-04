import axios from "axios"
import React from "react"
import { useMutation } from "react-query"
import config from 'config'
import { useAxios } from "@context/AxiosContext/AxiosProvider"
import Cookies from 'js-cookie'

interface UserProfile {
  name: string
  img_url: string
  role: string
}

interface LoginResponse {
  token: string
  profile: UserProfile | null
}

interface AuthContextValue {
  userProfile: UserProfile | null
  isAuthenticated: boolean
  isAuthLoading: boolean
  fetchProfile: () => Promise<
    { isAuthenticated: boolean; userProfile: UserProfile } | { isAuthenticated: boolean; userProfile: null }
  >
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const loginRequest = async ({
  username,
  password,
} : {
  username: string
  password: string
}) : Promise<LoginResponse> => {
  const { token, profile } = await axios
    .post<LoginResponse>(config.API_URL_CARBON + '/auth/login', {username, password})
    .then((response) => response.data)
    .catch((error) => {
      throw "Username atau Password salah"
    })

  return { token, profile }
}

// const refreshRequest = async () => {
//   // it is important that you use axios when fetching the refresh-token, that way we know the cookie
//   // with the refresh-token is included
//   const { token } = await axios.get<any, AxiosResponse<>>('/your-refresh-token-endpoint')
//   return { token }
// }

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

function AuthProvider({children}: {children: React.ReactNode}) {
  const accessTokenRef = React.useRef<string>()
  const [token, setToken] = React.useState<string>('')
  const [tokenExpires, setTokenExpires] = React.useState<string>()
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null)
  const [isAuthLoading, setIsAuthLoading] = React.useState(false)
  const { setToken: setAxiosToken } = useAxios()
  const { axios: axiosInstance } = useAxios()

  React.useEffect(() => {
    setAxiosToken(token)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const loginQuery = useMutation(loginRequest, {
    onSuccess: (data) => {
      const token = data?.token
      accessTokenRef.current = token
      setToken(token)
      Cookies.set('token', token)
      console.log("masuk sukses login")
      setUserProfile(data.profile)
    },
  })

  // this request should not have to include any logic as we are sending the token value with the cookies.
  // const refreshQuery = useMutation(refreshRequest, {
  //   onSuccess: (data) => {
  //     // the refresh-token request should return similiar data as the loginRequest.
  //     accessTokenRef.current = data.token
  //     setTokenExpires(data.tokenExpires)
  //   },
  //   // here we set a refetch-interval to avoid us sending a request without a valid access token.
  //   // you can either hardcode this value or calculate the diff until your token expires.
  //   refetchInterval: 300000,
  // })

  const login = async (username: string, password: string) => {
    await loginQuery.mutateAsync({ username, password })
    // you might want to wrap this in try / catch to handle errors and alert the user
    // if the username/password is incorrect.
  }

  const fetchProfile = async () => {
    setIsAuthLoading(true)
    const token = Cookies.get('token')

    let isAuthenticated = false
    let userProfile: UserProfile | null = null

    if (token) {
      await axiosInstance
        // TODO: Change to config base url
        .post<UserProfile>('https://36a52891-d7d8-461f-a550-939ec79c067a.mock.pstmn.io/auth/profile', { token })
        .then((response) => {
          setUserProfile(response.data)
          setToken(token)
          setAxiosToken(token)
          isAuthenticated = true
          userProfile = response.data
        })
        .catch((error) => {
          isAuthenticated = false
          userProfile = null
        })
    }
    setIsAuthLoading(false)
    return { isAuthenticated, userProfile }
  }

  const logout = () => {
    setToken('')
    setUserProfile(null)
    Cookies.remove('token')
  }



  const isSuccess = loginQuery.isSuccess // || refetchQuery.isSuccess
  const isAuthenticated = !!token && !!userProfile

  // example on provider
  const value = { userProfile, login, logout, isAuthenticated, fetchProfile, isAuthLoading }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
