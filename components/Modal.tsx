import { useSidebar } from '@context/SidebarContext'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

interface Props {
  children?: React.ReactNode
  isOpen: boolean
  isOverflow?: boolean
  setIsOpen: Function
}

export const Modal = ({ children, isOpen, setIsOpen, isOverflow }: Props) => {
  const {
    state: { isCollapsed },
  } = useSidebar()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible'
  }, [isOpen])

  return (
    <div
      className={`modal overflow-auto py-8
        ${isOpen && 'modal-open'} 
        ${!isCollapsed && 'ml-72'} 
        ${isOverflow ? 'items-start' : 'items-center'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
