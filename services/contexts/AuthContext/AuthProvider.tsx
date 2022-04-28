import axios from 'axios'
import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { getCookie, setCookies, removeCookies, checkCookies } from 'cookies-next';
import { loadUserProfile, login } from '@api/auth'
import { AuthContextValue, UserProfile } from './types'
import { useRouter } from 'next/router'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function AuthProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [token, setToken] = useState('')
  const [driveOAuth, setDriveOAuth] = useState<string>('')
  const isLoadingLogin_ = useRef<boolean>()
  const isAuthenticated_ = useRef<boolean>()
  const router = useRouter()

  useEffect(() => {
    if (checkCookies('token')) {
      const token_ = getCookie('token') as string
      setToken(token_)
    }
  }, [])


  useEffect(() => {
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }, [token])

  const useLoadUserProfileQuery = (token_: string | null) => {
    return useQuery(`profile-${token_}`, () => loadUserProfile({ token: token_ || '' }), {
      onSuccess: (data) => {
        setUserProfile(data)
      },
    })
  }

  const useLoginMutation = useMutation(login, {
    onSuccess: (data) => {
      const { token: token_, profile: userProfile_, driveOAuth: driveOAuth_ } = data
      setUserProfile(userProfile_)
      setToken(token_)
      setDriveOAuth(driveOAuth_)
      setCookies('token', token_)

      axios.defaults.headers.common['Authorization'] = `Bearer ${token_}`
    },
  })

  const logout = () => {
    setToken(null)
    setUserProfile(null)
    removeCookies('token')
    router.push('/login')
  }

  const setUserAvatar = (avatar: string) => {
    const userProfile_ = { ...(userProfile as UserProfile), profilePicture: avatar }
    setUserProfile(userProfile_)
  }

  const { isLoading: isLoadingUserProfile } = useLoadUserProfileQuery(token)
  isLoadingLogin_.current = useLoginMutation.isLoading
  isAuthenticated_.current = !!token && !!userProfile

  const value = {
    userProfile,
    driveOAuth,
    isAuthenticated: isAuthenticated_.current,
    useLoginMutation,
    logout,
    isLoadingLogin: isLoadingLogin_.current,
    isLoadingUserProfile,
    setUserProfile,
    setUserAvatar,
    setDriveOAuth,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
