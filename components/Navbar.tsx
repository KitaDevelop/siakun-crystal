import React from 'react'
import { FaRegUser, FaSignOutAlt } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import useAuth from '@hooks/useAuth'
import { ROLE, UserProfile } from '@context/AuthContext/types'
import { capitalize } from '@utils/capitalize'

export interface NavbarProps {
  title: String
  icon: React.ReactNode
  pageName?: string
}

export default function Navbar({ title, icon }: NavbarProps) {
  const { userProfile, logout } = useAuth()

  const displayName = userProfile?.role == ROLE.AUDITOR ? userProfile.username : userProfile?.organization.name

  return (
    <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost text-xl">{icon}</button>
      </div>
      <div className="flex-1">
        <span className="font-bold uppercase">{title}</span>
      </div>
      <div className="flex-none font-medium">
        <div>{capitalize(displayName!)}</div>
        <div className="dropdown dropdown-hover dropdown-end">
          <button tabIndex={0} className="ml-2 btn btn-square btn-ghost">
            <div className="avatar">
              <div className="rounded-full w-10 h-10">
                <Image
                  alt="avatar"
                  src={userProfile?.profilePicture || '/avatar-placeholder.png'}
                  width={40}
                  height={40}
                />
              </div>{' '}
            </div>
          </button>
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-base-content">
            <li>
              <Link href="/profile" passHref>
                <a>
                  <FaRegUser className="w-5 h-5 mr-2" /> Manage Profile
                </a>
              </Link>
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
