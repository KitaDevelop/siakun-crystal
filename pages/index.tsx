import { loadUserProfile } from '@api/auth'
import FilterControls from '@components/FilterControls'
import React, { useEffect, useState } from 'react'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { OrganisasiCard } from '@components/OrganisasiCard'
import { ROLE } from '@constants/auth'
import useAuth from '@hooks/useAuth'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FiHome } from 'react-icons/fi'
import { useFetchOrganizations } from '@api/organizations'
import { useYear } from '@hooks/useYear'
import { useOrganization } from '@hooks/useOrganization'

interface Props {
  userProfile: UserProfile
}

export default function Home({ userProfile }: Props) {
  const router = useRouter()

  const { setUserProfile } = useAuth()
  if (!!userProfile) {
    setUserProfile(userProfile)
    if (userProfile.role === ROLE.LEMBAGA) router.push('/chart-of-accounts')
  } else router.push('/login')

  const { year } = useYear()
  const { organizations, setOrganizations } = useOrganization()
  const { isLoading, data } = useFetchOrganizations(year)

  const [orgDisplay, setOrgDisplay] = useState<Organization[]>(organizations)
  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    if (!isLoading && data) {
      const { data: organization_ } = data
      setOrganizations(organization_)
    }
  }, [isLoading, data])

  useEffect(() => {
    if (data) {
      const { data: org_ } = data
      if (searchKeyword != '')
        setOrgDisplay(org_.filter((e) => e.name.toLowerCase().includes(searchKeyword.toLowerCase())))
      else setOrgDisplay(org_)
    }
  }, [data, searchKeyword])

  const meta: NavbarProps = {
    title: 'Home',
    icon: <FiHome />,
  }

  return (
    <Layout navbarProps={meta}>
      <div className="mx-auto max-w-screen-xl mb-8">
        <FilterControls isCanExport={false} {...{ searchKeyword, setSearchKeyword }} />
        <div className="grid grid-cols-3 gap-4 mt-6">
          {orgDisplay?.map((org) => (
            <OrganisasiCard key={org.id} id={org.id} organization={org} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
  const token = getCookie('token', { req, res }) as string
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  let userProfile = null
  try {
    userProfile = await loadUserProfile({ token })
  } catch (e) {}

  return {
    props: {
      userProfile,
    },
  }
}
