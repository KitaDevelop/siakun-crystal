import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import useAuth from '@hooks/useAuth'
import { useOrganization } from '@hooks/useOrganization'
import { useRouter } from 'next/router'
import { ROLE } from '@context/AuthContext/types'
const TrialBalance = dynamic(() => import('@components/TrialBalance'), { ssr: false })

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Trial Balance') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const TBPage = (props: Props) => {
  interface Props {}
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
      <TrialBalance />
    </Layout>
  )
}

export default TBPage
