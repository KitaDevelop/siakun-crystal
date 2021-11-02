import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'

interface Props {}

const navInfo: Navigation =
  navigation.find((n) => n.name == 'Buku Besar') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const BBPage = (props: Props) => {
  return <Layout navbarProps={meta}>ini buku besar</Layout>
}

export default BBPage
