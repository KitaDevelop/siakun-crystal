import React from 'react'

import Navbar, { NavbarProps } from './Navbar'
import { Sidebar } from './Sidebar'

const Layout: React.FC<LayoutProps> = ({
  navbarProps,
  children,
}: LayoutProps) => {
  return (
    <div className="bg-base-100 drawer drawer-mobile min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-6">
        <Navbar {...navbarProps} />
        <div className="text-sm breadcrumbs mx-4">
          <ul>
            <li className="font-bold text-primary">
              <a>Home</a>
            </li>
          </ul>
        </div>

        <main>{children}</main>
      </div>
      <Sidebar />
    </div>
  )
}

export type LayoutProps = {
  navbarProps: NavbarProps
  children?: React.ReactNode
}

export default Layout
