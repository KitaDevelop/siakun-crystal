import { useSidebar } from '@context/SidebarContext'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
interface Props {
  children?: React.ReactNode
  size?: 'md' | 'lg'
  isOverflow?: boolean
  isOpen: boolean
  setIsOpen: Function
}

export const Modal = ({ children, size, isOpen, setIsOpen, isOverflow }: Props) => {
  const {
    state: { isCollapsed },
  } = useSidebar()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible'
  }, [isOpen])

  const getModalWidth = () => {
    switch (size) {
      case 'lg':
        return 'max-w-screen-sm'
      default:
        return ''
    }
  }

  return (
    <div
      className={`modal overflow-auto py-8
        ${isOpen && 'modal-open'} 
        ${!isCollapsed && 'ml-72'} 
        ${isOverflow ? 'items-start' : 'items-center'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`modal-box ${getModalWidth()}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
