import React from 'react'

interface Props {
  children?: React.ReactNode
  isOpen: boolean
  setIsOpen: Function
}

export const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  return (
    <div className={`modal overflow-auto ${isOpen && 'modal-open'}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
