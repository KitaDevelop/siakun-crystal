import React from 'react'

export const Sidebar: React.FC = () => {
  return (
    <div className="drawer-side">
      <ul className="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content">
        <li>
          <a>Menu Item</a>
        </li>
        <li>
          <a>Menu Item</a>
        </li>
      </ul>
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
