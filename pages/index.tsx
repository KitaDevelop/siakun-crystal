import { loadUserProfile } from '@api/auth'
import FilterControls from '@components/FilterControls'
import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { OrganisasiCard } from '@components/OrganisasiCard'
import { UserProfile } from '@context/AuthContext/types'
import useAuth from '@hooks/useAuth'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FiHome } from 'react-icons/fi'

interface Props {
  userProfile: UserProfile
}

export default function Home({ userProfile }: Props) {
  const router = useRouter()

  const { setUserProfile } = useAuth()
  if (!!userProfile) {
    setUserProfile(userProfile)
  } else {
    router.push('/login')
  }

  const [searchKeyword, setSearchKeyword] = useState('')
  const meta: NavbarProps = {
    title: 'Home',
    icon: <FiHome />,
  }

  return (
    <Layout navbarProps={meta}>
      <div className="mx-auto max-w-screen-xl mb-8">
        <FilterControls isCanExport={false} {...{ searchKeyword, setSearchKeyword }} />
        <div className="grid grid-cols-3 gap-4 mt-6">
          {Array.from({ length: 12 })
            .map((_, i) => i)
            .map((x) => (
              <Link href="/chart-of-accounts" key={x} passHref>
                <a>
                  <OrganisasiCard id={x} />
                </a>
              </Link>
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
  } catch (e) { }

  return {
    props: {
      userProfile,
    },
  }
}
