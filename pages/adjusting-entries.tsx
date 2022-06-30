import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React, { useEffect } from 'react'
import AdjustingEntries from '@components/AdjustingEntries'
import useAuth from '@hooks/useAuth'
import { useOrganization } from '@hooks/useOrganization'
import { ROLE } from '@context/AuthContext/types'
import { useRouter } from 'next/router'

const navInfo: Navigation = navigation.find((n) => n.name == 'Adjusting Entries') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const AEPage = () => {
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
      <AdjustingEntries />
    </Layout>
  )
}

export default AEPage
