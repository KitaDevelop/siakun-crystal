import useAuth from '@hooks/useAuth'
import React, { useEffect } from 'react'

interface Props {}

export const Profile = (props: Props) => {
  const { userProfile } = useAuth()

  useEffect(() => {
    console.log(userProfile)
  }, [])

  return <div>ini profildde</div>
}

export default Profile
