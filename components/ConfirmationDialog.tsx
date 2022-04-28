import React, { ReactNode } from 'react'
import { Modal } from './Modal'

type Props = {
  confirmMessage?: string
  isOpen: boolean
  setIsOpen: Function
  onConfirm: Function
  children: ReactNode
}

export const ConfirmationDialog = ({ isOpen, setIsOpen, onConfirm, confirmMessage, children }: Props) => {
  return (
    <Modal {...{ isOpen, setIsOpen }}>
      <div className="flex flex-col items-center gap-4">
        {children}
        <div className="flex">
          <div onClick={() => setIsOpen(false)} className="btn btn-ghost">Cancel</div>
          <div onClick={() => {
            onConfirm()
            setIsOpen(false)
          }} className="btn btn-secondary">{confirmMessage || "Confirm"}</div>
        </div>
      </div>
    </Modal>
  )
}