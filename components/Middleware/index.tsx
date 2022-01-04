import React from 'react'
import router from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '@context/AuthContext/AuthProvider'

interface Props {
  children?: React.ReactNode
}

export const Middleware: React.FC<Props> = ({ children }: Props) => {
  const { isAuthenticated, fetchProfile } = useAuth()

  useEffect(() => {
    (async () => {
      let _isAuthenticated = isAuthenticated
      console.log(_isAuthenticated, '_isAuthenticated1')
      if (!_isAuthenticated) {
        const { isAuthenticated } = await fetchProfile()
        _isAuthenticated = isAuthenticated
        console.log(_isAuthenticated, '_isAuthenticated2')
      }

      console.log(_isAuthenticated, '_isAuthenticated3')
      if (!_isAuthenticated) router.push('/login')
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
