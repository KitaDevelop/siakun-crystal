import { getUserProfile } from '@api/auth'
import { getJournalEntriesByAccount } from '@api/entries/journal/endpoints'
import BukuBesar from '@components/BukuBesar'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { navigation, Navigation } from '@constants/navigation'
import { ROLE, UserProfile } from '@context/AuthContext/types'
import { JournalEntry } from '@context/JournalEntryContext/types'
import { useAccount } from '@hooks/useAccount'
import useAuth from '@hooks/useAuth'
import { useOrganization } from '@hooks/useOrganization'
import { extractAccountInfo } from '@utils/extractAccountInfo'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'

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

export const BukuBesarPage = ({ name, accountId }: Props) => {
  const { accounts } = useAccount()
  const account = accounts.find(x => x.id === accountId)!

  const [entries, setEntries] = useState<JournalEntry[]>([])
  const { userProfile } = useAuth()
  const { organizationView } = useOrganization()

  useEffect(() => {
    const fetchAccounts = async () => {
      if (userProfile?.role === ROLE.LEMBAGA) {
        const { data: { data } } = await getJournalEntriesByAccount(accountId, userProfile.organization.id)
        setEntries(data)
      } else {
        const { data: { data } } = await getJournalEntriesByAccount(accountId, organizationView?.id)
        setEntries(data)
      }
    }
    fetchAccounts()
  }, [])


  return (
    <Layout navbarProps={{ ...meta, pageName: name }}>
      <BukuBesar {...{ account, entries }} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const accountParam = params?.name
  const { name, accountId } = extractAccountInfo(accountParam)

  return { props: { name, accountId } }
}

export default BukuBesarPage
