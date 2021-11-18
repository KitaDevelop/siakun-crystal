import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'
import JournalEntries from '@components/JE'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Journal Entries') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const JEPage = (props: Props) => {
  return (
    <Layout navbarProps={meta}>
      <JournalEntries />
    </Layout>
  )
}

export default JEPage
