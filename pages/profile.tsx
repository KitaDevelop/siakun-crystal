import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { CgProfile } from 'react-icons/cg'
import React from 'react'
import Profile from '@components/Profile'

interface Props {}

const meta: NavbarProps = {
  title: 'Profile',
  icon: <CgProfile />,
}

export const ProfilePage = (props: Props) => {
  return (
    <Layout navbarProps={meta}>
      <Profile />
    </Layout>
  )
}

export default ProfilePage
