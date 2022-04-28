import React, { useState } from 'react'
import Link from 'next/link'
import Layout from '@components/Layout'
import { FiHome } from 'react-icons/fi'
import { NavbarProps } from '@components/Navbar'
import { OrganisasiCard } from '@components/OrganisasiCard'
import FilterControls from '@components/FilterControls'

export default function Home() {
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
