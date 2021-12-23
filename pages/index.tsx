import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '@components/Layout'
import { FiHome } from 'react-icons/fi'
import { NavbarProps } from '@components/Navbar'
import { OrganisasiCard } from '@components/OrganisasiCard'
import Select from 'react-select'
import { HiOutlineSearch } from 'react-icons/hi'
import { customStyles } from '@components/ChartOfAccounts/AddAccountModal/Select'
import { SelectYearOption } from '@components/JournalEntries/FilterControls'
import { CURRENT_YEAR } from '@constants/.'
import { useSidebar } from '@context/SidebarContext'

export default function Home() {
  const [year, setYear] = useState<SelectYearOption[]>(years.filter((option) => option.value === CURRENT_YEAR))
  const meta: NavbarProps = {
    title: 'Home',
    icon: <FiHome />,
  }

  const isSelectYearOption = (v: any): v is SelectYearOption => {
    if ((v as SelectYearOption).value !== undefined) return v.value
    return false
  }

  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout navbarProps={meta}>
        <div className="mx-auto max-w-screen-xl mb-8">
          <div className="flex justify-between">
            <div className="form-control w-96">
              <div className="relative">
                <button className="absolute top-0 left-0 rounded-r-none btn btn-ghost">
                  <HiOutlineSearch className="h-5 w-5" />
                </button>
                <input type="text" placeholder="Search" className="w-full pl-12 input input-bordered" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="label font-bold">
                <span className="label-text">Year:</span>
              </label>
              <Select
                options={years}
                value={year}
                styles={customStyles}
                closeMenuOnSelect
                isSearchable
                onChange={(v) => {
                  if (isSelectYearOption(v)) setYear([v])
                }}
              />
            </div>
          </div>
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
    </div>
  )
}

const years: SelectYearOption[] = [
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
]
