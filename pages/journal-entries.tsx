import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'

interface Props {}

const navInfo: Navigation =
  navigation.find((n) => n.name == 'Journal Entries') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const JEPage = (props: Props) => {
  return <Layout navbarProps={meta}>ini journal entries</Layout>
}

export default JEPage
