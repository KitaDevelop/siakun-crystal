import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import TrialBalance from '@components/TrialBalance'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Trial Balance') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const TBPage = (props: Props) => {
  return (
    <Layout navbarProps={meta}>
      <TrialBalance />
    </Layout>
  )
}

export default TBPage
