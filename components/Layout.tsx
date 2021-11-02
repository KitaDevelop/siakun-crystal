import { SidebarProvider } from '@context/SidebarContext'
import React, { useContext } from 'react'

import Navbar, { NavbarProps } from './Navbar'
import { Sidebar, SidebarCollapsed } from './Sidebar'
import Breadcrumbs from './Breadcrumbs'

export type LayoutProps = {
  navbarProps: NavbarProps
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ navbarProps, children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="bg-base-100 drawer drawer-mobile min-h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-6">
          <Navbar {...navbarProps} />
          <Breadcrumbs />

          <main>{children}</main>
        </div>
        <SidebarCollapsed />
        <Sidebar />
      </div>
    </SidebarProvider>
  )
}

export default Layout
