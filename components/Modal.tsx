import { useSidebar } from '@context/SidebarContext'
import React, { useContext } from 'react'

interface Props {
  children?: React.ReactNode
  isOpen: boolean
  setIsOpen: Function
}

export const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  const {
    state: { isCollapsed },
  } = useSidebar()
  return (
    <div
      className={`modal overflow-auto ${isOpen && 'modal-open'} ${!isCollapsed && 'ml-72'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
