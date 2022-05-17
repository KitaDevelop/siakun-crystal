import React, { useEffect } from 'react'
import router, { useRouter } from 'next/router'
import useAuth from '@hooks/useAuth'
import { FullPageLoader } from '@components/FullPageLoader'

interface Props {
  children?: React.ReactNode
}

export const Middleware: React.FC<Props> = ({ children }: Props) => {
  const { isAuthenticated, isLoadingLogin, isLoadingUserProfile } = useAuth()

  const { pathname } = useRouter()

  const isLoginPage = pathname.includes('/login')
  const isErrorPage = pathname.includes('error')

  useEffect(() => {
    if (!isLoginPage && !isErrorPage && !isAuthenticated && !isLoadingLogin && !isLoadingUserProfile) {
      router.push('/login');
    }
  }, [isLoginPage, isErrorPage, isAuthenticated, isLoadingLogin, isLoadingUserProfile]);

  if (!isLoginPage && !isErrorPage && (isLoadingLogin || isLoadingUserProfile || !isAuthenticated)) {
    return <FullPageLoader />;
  }

  // if (!isLoginPage && !isErrorPage && !isAuthenticated && !isLoadingLogin && !isLoadingUserProfile) {
  //   router.push('/login')
  //   return <></>
  // }

  return <>{children}</>
}
