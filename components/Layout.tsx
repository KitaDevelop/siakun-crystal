import React from 'react'
import Head from 'next/head'

import Navbar, { NavbarProps } from './Navbar'
import { Sidebar } from './Sidebar'
import Breadcrumbs from './Breadcrumbs'
import { useSidebar } from '@context/SidebarContext'

export type LayoutProps = {
  navbarProps: NavbarProps
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ navbarProps, children }: LayoutProps) => {
  // dummy
  const {
    state: { role },
  } = useSidebar()

  return (
    <div>
      <Head>
        <title>{navbarProps.title}</title>
        <link rel="icon" href="/logo_icon_only.png" />
      </Head>
      <div className="bg-base-100 drawer drawer-mobile min-h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-6">
          <Navbar {...navbarProps} />
          <Breadcrumbs />

          <main>{children}</main>
        </div>
        {(role != 'auditor' || navbarProps.title != 'Home') && <Sidebar />}
      </div>
    </div>
  )
}

export default Layout
