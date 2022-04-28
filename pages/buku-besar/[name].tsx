import { getJournalEntriesByAccount } from '@api/entries/journal/endpoints'
import BukuBesar from '@components/BukuBesar'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { navigation, Navigation } from '@constants/navigation'
import { JournalEntry } from '@context/JournalEntryContext/types'
import { useAccount } from '@hooks/useAccount'
import { extractAccountInfo } from '@utils/extractAccountInfo'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import React from 'react'

interface Props {
  name: string
  accountId: number
  entries: JournalEntry[]
}

const navInfo: Navigation = navigation.find((n) => n.name == 'Buku Besar') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const BukuBesarPage = ({ name, accountId, entries }: Props) => {
  const { accounts } = useAccount()
  const account = accounts.find(x => x.id === accountId)!

  return (
    <Layout navbarProps={{ ...meta, pageName: name }}>
      <BukuBesar {...{ account, entries }} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const accountParam = params?.name
  const { name, accountId } = extractAccountInfo(accountParam)

  const token = getCookie('token', { req, res }) as string
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const { data: { data } } = await getJournalEntriesByAccount(accountId)

  return { props: { name, accountId, entries: data } }
}

export default BukuBesarPage
