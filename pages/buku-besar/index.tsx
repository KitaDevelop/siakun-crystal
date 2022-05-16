import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface Props { }

const navInfo: Navigation =
  navigation.find((n) => n.name == 'Buku Besar') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const BBPage = (props: Props) => {
  const router = useRouter()

  useEffect(() => {
    router.push('/chart-of-accounts')
  }, [])


  return <Layout navbarProps={meta}>
    <div className="w-full h-96 grid place-items-center">
      <FaSpinner className="w-10 h-10 animate-spin" />
    </div>
  </Layout>
}

export default BBPage
