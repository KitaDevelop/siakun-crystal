import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React, { useEffect } from 'react'
import JournalEntries from '@components/JournalEntries'
import useAuth from '@hooks/useAuth'
import { useOrganization } from '@hooks/useOrganization'
import { useRouter } from 'next/router'
import { ROLE } from '@context/AuthContext/types'

const navInfo: Navigation = navigation.find((n) => n.name == 'Journal Entries') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const JEPage = () => {
  const { userProfile } = useAuth()
  const { organizationView } = useOrganization()
  const router = useRouter()

  useEffect(() => {
    if (userProfile?.role != ROLE.LEMBAGA && !organizationView?.id) {
      router.push('/')
    }
  }, [userProfile, organizationView])

  return (
    <Layout navbarProps={meta}>
      <JournalEntries />
    </Layout>
  )
}

export default JEPage
