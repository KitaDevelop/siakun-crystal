import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'
import ChartOfAccount from '@components/CoA'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Chart of Accounts') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const CoAPage = (props: Props) => {
  return (
    <Layout navbarProps={meta}>
      <ChartOfAccount />
    </Layout>
  )
}
export default CoAPage
