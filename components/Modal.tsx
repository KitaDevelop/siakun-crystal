import React from 'react'

interface Props {
  children?: React.ReactNode
  isOpen: boolean
  setIsOpen: Function
}

export const Modal = ({ children, isOpen, setIsOpen }: Props) => {
  return (
    <div className={`modal ${isOpen && 'modal-open'}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="modal-box">{children}</div>
    </div>
  )
}
