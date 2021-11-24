import { Modal } from '@components/Modal'
import { useJournalEntry } from '@context/JournalEntryContext/JournalEntryProvider'
import React from 'react'
import { IoAdd } from 'react-icons/io5'
import { ReceiptDropzone } from './ReceiptDropzone'
import { TransactionInputTable } from './TransactionInputTable'

interface Props {
  isOpen: boolean
  setIsOpen: Function
}

export const AddJournalEntryModal = ({ isOpen, setIsOpen }: Props) => {
  const {
    state: { transactions },
    dispatch,
  } = useJournalEntry()

  const onAddTransaction = () => {
    dispatch({
      type: 'set_transactions',
      transactions: [...transactions, { id: Date.now(), accNumber: '', accName: '' }],
    })
  }

  return (
    <Modal {...{ isOpen, setIsOpen, size: 'lg', isOverflow: transactions.length > 2 }}>
      <div className="font-bold text-xl mb-4">Create New Entry</div>
      <form className="w-96 flex flex-col gap-2">
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">
              Date <span className="text-error">*</span>
            </span>
          </label>
          <input type="date" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">Description</span>
          </label>
          <textarea className="textarea textarea-bordered resize-none" placeholder="Enter Description"></textarea>
        </div>
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">Receipts</span>
          </label>
          <ReceiptDropzone />
        </div>
      </form>
      <div className="form-control mt-2">
        <label className="label font-bold">
          <span className="label-text">Transactions</span>
        </label>
        <TransactionInputTable />
        <div onClick={onAddTransaction} className="btn btn-ghost text-primary self-start btn-sm">
          <IoAdd className="mr-2" /> Add More
        </div>
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
