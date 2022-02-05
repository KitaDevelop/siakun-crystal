import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@components/Layout'
import { FiHome } from 'react-icons/fi'
import { NavbarProps } from '@components/Navbar'
import { OrganisasiCard } from '@components/OrganisasiCard'
import useAuth from '@hooks/useAuth'
import { FirstLogin } from '@components/Login/FirstLogin'
import FilterControls from '@components/FilterControls'

export default function Home() {
  const [searchKeyword, setKeyword] = useState('')
  const { driveOAuth } = useAuth()
  const meta: NavbarProps = {
    title: 'Home',
    icon: <FiHome />,
  }

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {driveOAuth ? (
        <FirstLogin />
      ) : (
        <Layout navbarProps={meta}>
          <div className="mx-auto max-w-screen-xl mb-8">
            <FilterControls isCanExport={false} {...{ searchKeyword, setKeyword }} />
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
      )}
    </div>
  )
}
