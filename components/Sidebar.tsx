import React from 'react'
import { BsBarChartLine, BsJournalBookmark } from 'react-icons/bs'
import { IoBookOutline } from 'react-icons/io5'
import { MdOutlineAccountBalance } from 'react-icons/md'
import { FiChevronsLeft } from 'react-icons/fi'

export const Sidebar: React.FC = () => {
  return (
    <div className="drawer-side p-2 overflow-y-auto w-72 bg-base-200 text-base-content">
      <div className="flex flex-col items-start">
        <img src="/logo.png" alt="logo" className="object-none p-4 pb-2" />
        <ul className="menu w-full p-2 rounded-box flex-1">
          <li>
            <a>
              <BsBarChartLine className="w-5 h-5 mr-2" /> Chart of Accounts
            </a>
          </li>
          <li>
            <a>
              <BsJournalBookmark className="w-5 h-5 mr-2" />
              Journal Entries
            </a>
          </li>

          <li>
            <a>
              <MdOutlineAccountBalance className="w-5 h-5 mr-2" />
              Adjusting Entries
            </a>
          </li>
          <li>
            <a>
              <IoBookOutline className="w-5 h-5 mr-2" />
              Buku Besar
            </a>
          </li>
          <li>
            <a>
              <BsJournalBookmark className="w-5 h-5 mr-2" />
              Trial Balance
            </a>
          </li>
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
