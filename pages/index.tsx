import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '@components/Layout'
import { FiHome } from 'react-icons/fi'
import { NavbarProps } from '@components/Navbar'
import { OrganisasiCard } from '@components/OrganisasiCard'
import FilterControls from '@components/FilterControls'
import { useFetchOrganizations } from '@api/organizations'
import { useYear } from '@hooks/useYear'
import { useOrganization } from '@hooks/useOrganization'

export default function Home() {
  const { year } = useYear()
  const { organizations, setOrganizations } = useOrganization()
  const { isLoading, data, isFetching, refetch } = useFetchOrganizations(year)

  const [searchKeyword, setSearchKeyword] = useState('')

  useEffect(() => {
    if (!isLoading && data) {
      const { data: organization_ } = data
      setOrganizations(organization_)
    }
  }, [isLoading, data])


  const meta: NavbarProps = {
    title: 'Home',
    icon: <FiHome />,
  }

  return (
    <Layout navbarProps={meta}>
      <div className="mx-auto max-w-screen-xl mb-8">
        <FilterControls isCanExport={false} {...{ searchKeyword, setSearchKeyword }} />
        <div className="grid grid-cols-3 gap-4 mt-6">
          {organizations.map((org) => (
            <OrganisasiCard key={org.id} id={org.id} organization={org} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
