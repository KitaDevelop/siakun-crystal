import { useFetchAccounts } from '@api/accounts'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React, { useEffect } from 'react'
import ChartOfAccount from '@components/ChartOfAccounts'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Chart of Accounts') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const CoAPage = (props: Props) => {
  const { isLoading, isError, data, error } = useFetchAccounts()

  useEffect(() => {
    console.log(data, 'useFetchAccount data')
  }, [data, isLoading])

  return (
    <Layout navbarProps={meta}>
      ini Chart of accounts
      {isLoading ? <h1>Loading...</h1> : <ChartOfAccount data={data?.data} />}
    </Layout>
  )
}
export default CoAPage
