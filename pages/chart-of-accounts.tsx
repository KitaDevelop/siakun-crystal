import { useFetchAccounts } from '@api/accounts'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React, { useEffect } from 'react'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Chart of Accounts') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const CoAPage = (props: Props) => {
  const { isLoading, isError, data, error } = useFetchAccounts()

  useEffect(() => {
    console.log(data)
  }, [data, isLoading])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <Layout navbarProps={meta}>
      ini Chart of accounts
      {data?.data.map((d) => (
        <div key={`coa-${d.accountNumber}`} className="my-4">
          <p>{d.accountNumber}</p>
          <p>{d.name}</p>
          <p>{d.description}</p>
          <p>{d.category}</p>
          <p>{d.normalBalance}</p>
          <p>{d.type}</p>
        </div>
      ))}
    </Layout>
  )
}

export default CoAPage
