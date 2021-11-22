import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { navigation } from '@constants/navigation'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { useSidebar } from '@context/SidebarContext'

export const Sidebar: React.FC = () => {
  return (
    <>
      <SidebarCollapsed />
      <SidebarExpanded />
    </>
  )
}

const SidebarExpanded: React.FC = () => {
  const { pathname } = useRouter()
  const {
    state: { isCollapsed },
    dispatch,
  } = useSidebar()

  return (
    <div
      className={`drawer-side p-2 overflow-y-auto bg-base-200 z-10 text-base-content overflow-hidden transition-all ease-in-out ${
        isCollapsed ? '-translate-x-full w-0 h-0' : 'w-72'
      }`}
    >
      <div className="flex flex-col items-start">
        <div className="object-none p-4 pb-2 cursor-pointer">
          <Link href="/" passHref>
            <Image src="/logo.png" alt="logo" width={80} height={46} />
          </Link>
        </div>
        <ul className="menu w-full p-2 rounded-box flex-1">
          {navigation.map((navItem) => (
            <li key={navItem.name}>
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
        <div
          className="btn btn-ghost flex justify-between w-full"
          onClick={() => dispatch({ type: 'toggle_collapse' })}
        >
          Collapse Sidebar <FiChevronsLeft className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

const SidebarCollapsed: React.FC = () => {
  const { pathname } = useRouter()
  const { dispatch } = useSidebar()
  return (
    <div className="drawer-side overflow-y-auto w-16 bg-base-200 text-base-content z-10">
      <div className="flex flex-col items-center">
        <div className="object-none px-4 pb-2 pt-6 cursor-pointer">
          <Link href="/" passHref>
            <Image width={22} height={35} src="/logo_icon_only.png" alt="logo" />
          </Link>
        </div>
        <ul className="menu rounded-lg flex-1">
          {navigation.map((navItem) => (
            <li key={navItem.name}>
              <Link href={navItem.link}>
                <a className={pathname.startsWith(navItem.link) ? 'active font-semibold icon-only' : 'icon-only'}>
                  <div className="w-5 h-5 overflow-visible">
                    <div className="absolute">
                      <div className="tooltip tooltip-right" data-tip={navItem.name}>
                        {navItem.icon}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="btn btn-ghost flex justify-between mb-1" onClick={() => dispatch({ type: 'toggle_collapse' })}>
          <FiChevronsRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
