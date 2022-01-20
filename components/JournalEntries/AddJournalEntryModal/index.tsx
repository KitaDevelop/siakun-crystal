import { Modal } from '@components/Modal'
import { JournalEntry } from '@context/JournalEntryContext/types'
import { useJournalEntry } from '@hooks/useJournalEntry'
import { blobToBase64 } from '@utils/blobToBase64'
import React, { ChangeEvent } from 'react'
import { ReceiptDropzone } from './ReceiptDropzone'
import { TransactionInputTable } from './TransactionInputTable'

interface Props {
  isOpen: boolean
  setIsOpen: Function
}

export const AddJournalEntryModal = ({ isOpen, setIsOpen }: Props) => {
  const {
    state: { date, description, receipt, transactions },
    dispatch,
  } = useJournalEntry()

  const onSubmitEntry = async () => {
    var receiptBase64
    if (receipt) receiptBase64 = await blobToBase64(receipt)

    let payload = {
      date,
      description,
      receipt: receiptBase64,
      transactions: transactions.map((t) => {
        let { id, ...transaction } = t
        return transaction
      }),
    }
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
          <input
            type="date"
            className="input input-bordered"
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'set_date', date: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              dispatch({ type: 'set_desc', description: e.target.value })
            }
            className="textarea textarea-bordered resize-none"
            placeholder="Enter Description"
          ></textarea>
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
      </div>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
          cancel
        </button>
        <button className="btn btn-primary" onClick={() => onSubmitEntry()}>
          create
        </button>
      </div>
    </Modal>
  )
}
