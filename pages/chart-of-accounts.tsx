import { useFetchAccounts } from '@api/accounts'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React, { useEffect } from 'react'
import ChartOfAccount from '@components/ChartOfAccounts'
import { useYear } from '@hooks/useYear'
import { Loader } from '@components/Loader'
import useAuth from '@hooks/useAuth'
import { useOrganization } from '@hooks/useOrganization'
import { useRouter } from 'next/router'
import { ROLE } from '@context/AuthContext/types'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Chart of Accounts') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const CoAPage = (props: Props) => {
  const { year } = useYear()
  const { isLoading, isSuccess } = useFetchAccounts(year)
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
      {isLoading && !isSuccess ? (
        <div className="w-full grid place-content-center h-80 text-accent">
          <Loader />
        </div>
      ) : (
        <ChartOfAccount />
      )}
    </Layout>
  )
}
export default CoAPage
