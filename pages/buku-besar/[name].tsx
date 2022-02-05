import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { navigation, Navigation } from '@constants/navigation'
import { useRouter } from 'next/router'
import React from 'react'
import BukuBesar from '@components/BukuBesar'
import { Account, AccountCategory, AccountType, NormalBalance } from '@context/AccountContext/types'

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
  // TODO: fetch account info
  // TODO: fetch entries

  return (
    <Layout navbarProps={meta}>
      <BukuBesar {...{ data }} />
    </Layout>
  )
}

const data: Account = {
  id: 1,
  number: '111',
  name: 'test name',
  description: 'test desc',
  category: AccountCategory.AKUN,
  type: AccountType.LABARUGI,
  normalBalance: NormalBalance.CREDIT,
}
export default BukuBesarPage
