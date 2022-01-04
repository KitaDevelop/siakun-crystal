import { Modal } from '@components/Modal'
import { useAdjustingEntry } from '@hooks/useAdjustingEntry'
import React from 'react'
import { TransactionInputTable } from './TransactionInputTable'

interface Props {
  isOpen: boolean
  setIsOpen: Function
}

export const AddAdjustingEntryModal = ({ isOpen, setIsOpen }: Props) => {
  const {
    state: { transactions },
  } = useAdjustingEntry()

  return (
    <Modal {...{ isOpen, setIsOpen, size: 'lg', isOverflow: transactions.length > 2 }}>
      <div className="font-bold text-xl mb-4">Create New Adjusting Entry</div>
      <form className="w-96 flex flex-col gap-2">
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">Description</span>
          </label>
          <textarea className="textarea textarea-bordered resize-none" placeholder="Enter Description"></textarea>
        </div>
      </form>
      <div className="form-control mt-2">
        <label className="label font-bold">
          <span className="label-text">Transactions</span>
        </label>
        <TransactionInputTable />
      </div>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
          cancel
        </button>
        <button className="btn btn-primary">create</button>
      </div>
    </Modal>
  )
}
