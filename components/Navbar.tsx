import React from 'react'
import { FaRegUser, FaSignOutAlt } from 'react-icons/fa'
import Image from 'next/image'
import { useAuth } from '@context/AuthContext/AuthProvider'
import { useSidebar } from '@context/SidebarContext'

export interface NavbarProps {
  title: String
  icon: React.ReactNode
}

export default function Navbar({ title, icon }: NavbarProps) {
  const {logout} = useAuth()
  // dummy
  const {
    state: { role },
    dispatch,
  } = useSidebar()

  return (
    <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost text-xl">{icon}</button>
      </div>
      <div className="flex-1">
        <span className="font-bold uppercase">{title}</span>
      </div>
      <div className="flex-none font-medium">
        <div
          className="btn btn-secondary mr-4"
          onClick={() => dispatch({ type: 'set_role', role: role == 'auditor' ? 'organization' : 'auditor' })}
        >
          switch role
        </div>
        Gue Lagi Login
        <div className="dropdown dropdown-hover dropdown-end">
          <button tabIndex={0} className="ml-2 btn btn-square btn-ghost">
            <div className="avatar">
              <div className="rounded-full w-10 h-10">
                <Image alt="avatar" src="/avatar-placeholder.png" width={40} height={40} />
              </div>
            </div>
          </button>
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-base-content">
            <li>
              <a>
                <FaRegUser className="w-5 h-5 mr-2" /> Manage Profile
              </a>
            </li>
            <li className="text-error">
              <a onClick={logout}>
                <FaSignOutAlt className="w-5 h-5 mr-2" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
