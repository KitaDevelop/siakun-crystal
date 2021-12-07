import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'
import AdjustingEntries from '@components/AdjustingEntries'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Adjusting Entries') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const AEPage = (props: Props) => {
  return (
    <Layout navbarProps={meta}>
      <AdjustingEntries />
    </Layout>
  )
}

export default AEPage
