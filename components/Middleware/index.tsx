import React from 'react'
import router, { useRouter } from 'next/router'
import { useAuth } from '@context/AuthContext/AuthProvider'

interface Props {
  children?: React.ReactNode
}

export const Middleware: React.FC<Props> = ({ children }: Props) => {
  const {
    isAuthenticated,
    isLoadingLogin,
    isLoadingUserProfile,
  } = useAuth()

  const { pathname } = useRouter()

  const isLoginPage = pathname.includes('/login')
  const isErrorPage = pathname.includes('error')

  if (
    !isLoginPage
    && !isErrorPage
    && !isAuthenticated
    && !isLoadingLogin
    && !isLoadingUserProfile
  ) {
    router.push('/login')
    return <></>;
  }

  return <>{children}</>;
}
