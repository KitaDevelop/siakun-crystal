import { useFetchAccounts } from '@api/accounts'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'
import ChartOfAccount from '@components/ChartOfAccounts'
import { useYear } from '@hooks/useYear'
import { Loader } from '@components/Loader'

interface Props { }

const navInfo: Navigation = navigation.find((n) => n.name == 'Chart of Accounts') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const CoAPage = (props: Props) => {
  const { year } = useYear()
  const { isLoading, isSuccess } = useFetchAccounts(year)

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
