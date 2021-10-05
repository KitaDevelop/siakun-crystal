import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navigation } from '@constants/navigation'
import { FiChevronsLeft } from 'react-icons/fi'

export const Sidebar: React.FC = () => {
  const { pathname } = useRouter()

  return (
    <div className="drawer-side p-2 overflow-y-auto w-72 bg-base-200 text-base-content">
      <div className="flex flex-col items-start">
        <Link href="/">
          <img src="/logo.png" alt="logo" className="object-none p-4 pb-2 cursor-pointer" />
        </Link>
        <ul className="menu w-full p-2 rounded-box flex-1">
          {navigation.map((navItem) => (
            <li>
              <Link href={navItem.link}>
                <a className={pathname.startsWith(navItem.link) ? 'active font-semibold' : ''}>
                  <div className="flex gap-2 items-center">
                    {navItem.icon} {navItem.name}
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="btn btn-ghost flex justify-between w-full">
          Collapse Sidebar <FiChevronsLeft className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

export const SidebarCollapsed: React.FC = () => {
  return (
    <div className="drawer-side">
      <ul className="menu p-auto overflow-y-auto w-16 bg-base-200 text-base-content">
        <li>
          <a>A</a>
        </li>
        <li>
          <a>A</a>
        </li>
      </ul>
    </div>
  )
}
