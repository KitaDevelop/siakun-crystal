import { Account } from '@api/accounts'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { navigation, Navigation } from '@constants/navigation'
import { useRouter } from 'next/router'
import React from 'react'
import BukuBesar from '@components/BukuBesar'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Buku Besar') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const BukuBesarPage = (props: Props) => {
  const router = useRouter()
  const { name } = router.query
  const accountName = name instanceof Array ? name[0] : name
  // fetch account info
  // fetch entries

  return (
    <Layout navbarProps={meta}>
      <BukuBesar {...{ data }} />
    </Layout>
  )
}

const data: Account = {
  id: 1,
  accountNumber: '111',
  name: 'test name',
  description: 'test desc',
  category: 'test categ',
  type: 'test type',
  normalBalance: 'kredit',
}
export default BukuBesarPage
