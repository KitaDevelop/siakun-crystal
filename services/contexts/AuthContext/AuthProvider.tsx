import axios from 'axios'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import Cookies from 'js-cookie'
import { loadUserProfile, login } from '@api/auth'
import { AuthContextValue, UserProfile } from './types'
import { useRouter } from 'next/router'

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null)
  const [token, setToken] = React.useState(Cookies.get('token') || null)
  const router = useRouter()

  const useLoadUserProfileQuery = (token_: string | null) => {
    return useQuery(`profile-${token_}`, () => loadUserProfile({ token: token_ || '' }), {
      onSuccess: (data) => {
        setUserProfile(data)
        setToken(token_)
        axios.defaults.headers.common['Authorization'] = `BEARER ${token_}`
      },
      staleTime: 3600 * 1000,
      cacheTime: 3600 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    })
  }

  const useLoginMutation = useMutation(login, {
    onSuccess: (data) => {
      const { token: token_, profile: userProfile_ } = data
      setUserProfile(userProfile_)
      setToken(token_)
      Cookies.set('token', token_)

      axios.defaults.headers.common['Authorization'] = `BEARER ${token_}`
    },
  })

  const logout = () => {
    setToken(null)
    setUserProfile(null)
    Cookies.remove('token')
    router.push('/login')
  }

  const { isLoading: isLoadingUserProfile } = useLoadUserProfileQuery(token)
  const isLoadingLogin = useLoginMutation.isLoading
  // const isAuthenticated = !!token && !!userProfile
  const isAuthenticated = !!token

  const value = {
    userProfile,
    isAuthenticated,
    useLoginMutation,
    logout,
    isLoadingLogin,
    isLoadingUserProfile,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
