import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { navigation } from '@constants/navigation'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import { useSidebar } from '@context/SidebarContext'
import useAuth from '@hooks/useAuth'
import { ROLE } from '@context/AuthContext/types'
import { OrganizationSelect } from './OrganizationSelect'
import { useOrganization } from '@hooks/useOrganization'

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
  const { organizationView } = useOrganization()
  const { userProfile } = useAuth()
  const {
    state: { isCollapsed },
    dispatch,
  } = useSidebar()

  return (
    <div
      className={`drawer-side p-2 overflow-y-auto bg-base-200 z-10 text-base-content overflow-hidden transition-all ease-in-out ${isCollapsed ? '-translate-x-full w-0 h-0' : 'w-72'
        }`}
    >
      <div className="flex flex-col items-start">
        <div className="object-none p-4 pb-2 cursor-pointer">
          <Link href="/" passHref>
            <a>
              <Image src="/logo.png" alt="logo" width={80} height={46} />
            </a>
          </Link>
        </div>
        {userProfile?.role == ROLE.AUDITOR && (
          <div className="px-2 mb-4 w-full">
            <div className="text-sm font-bold text-gray-400 mb-1">You are viewing:</div>
            <div className="flex gap-2">
              <div className="avatar">
                <div className="w-9 h-9 rounded-full border border-gray-400">
                  <Image alt="organisasi" src={organizationView?.profilePicture || "/avatar-placeholder.png"} width={36} height={36} />
                </div>
              </div>
              <OrganizationSelect />
            </div>
          </div>
        )}
        <ul className="menu w-full p-2 rounded-box flex-1">
          {navigation.map((navItem) => (
            <li key={navItem.name}>
              <Link href={navItem.link} passHref>
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
  const { userProfile } = useAuth()
  const { organizationView } = useOrganization()
  const { pathname } = useRouter()
  const { dispatch } = useSidebar()

  return (
    <div className="drawer-side w-16 bg-base-200 text-base-content z-10" style={{ overflow: 'visible' }}>
      <div className="flex flex-col items-center">
        <div className="object-none px-4 pb-2 pt-6 cursor-pointer">
          <Link href="/" passHref>
            <a>
              <Image width={22} height={35} src="/logo_icon_only.png" alt="logo" />
            </a>
          </Link>
        </div>
        {userProfile?.role == ROLE.AUDITOR && (
          <div className="dropdown dropdown-right mb-3">
            <div className="divider m-0 mb-2"></div>
            <div tabIndex={-1} className="avatar mx-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full border border-gray-400">
                <Image alt="organisasi" src={organizationView?.profilePicture || "/avatar-placeholder.png"} width={36} height={36} />
              </div>
            </div>
            <div tabIndex={-1} className="dropdown-content bg-base-100 w-72 card p-4 shadow-lg overflow-visible">
              <div className="text-sm font-bold text-gray-400 mb-1">You are viewing:</div>
              <OrganizationSelect />
            </div>
          </div>
        )}
        <ul className="menu rounded-lg flex-1 overflow-visible">
          {navigation.map((navItem) => (
            <li key={navItem.name} className="tooltip tooltip-right" data-tip={navItem.name}>
              <Link href={navItem.link} passHref>
                <a className={pathname.startsWith(navItem.link) ? 'active font-semibold icon-only' : 'icon-only'}>
                  <div className="w-5 h-5">{navItem.icon}</div>
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
