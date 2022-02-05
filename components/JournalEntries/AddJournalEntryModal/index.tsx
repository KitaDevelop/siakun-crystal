import { useCreateJournalEntry, useFetchJournalEntry, useUpdateJournalEntry } from '@api/entries/journal'
import { Modal } from '@components/Modal'
import { useJournalEntry } from '@hooks/useJournalEntry'
import { useYear } from '@hooks/useYear'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import DateInput from './Form/DateInput'
import DescriptionTextarea from './Form/DescriptionTextarea'
import ReceiptInput from './Form/ReceiptInput'
import { TransactionInputTable } from './TransactionInputTable'

interface Props {
  isOpen: boolean
  isBlank: boolean
  setIsOpen: Function
}

export const AddJournalEntryModal = ({ isBlank, isOpen, setIsOpen }: Props) => {
  const { year } = useYear()
  const {
    state: { id, date, description, receipt, transactions },
    dispatch,
  } = useJournalEntry()
  const { isLoading, data, refetch } = useFetchJournalEntry(id, year)
  const createEntry = useCreateJournalEntry()
  const updateEntry = useUpdateJournalEntry()

  useEffect(() => {
    if (isBlank) {
      dispatch({ type: 'set_empty' })
    } else {
      refetch()
    }
  }, [isBlank])

  useEffect(() => {
    if (!isBlank && !isLoading && data) {
      const { data: entry } = data
      dispatch({ type: 'set_entry', entry: entry })
    }
  }, [isLoading, data])

  const onSubmitEntry = async () => {
    let payload = {
      date,
      description,
      receipt,
      transactions: transactions.map((t) => {
        let { accountNumber, debit, credit } = t
        return {
          accountNumber,
          debit: debit || 0,
          credit: credit || 0,
        }
      }),
    }
    console.log(payload)
    if (isBlank) {
      createEntry.mutate(
        { year, entry: payload },
        {
          onSuccess: () => {
            toast.success(`Created entry from ${date}.`)
          },
        }
      )
    } else {
      updateEntry.mutate(
        { id, year, entry: payload },
        {
          onSuccess: () => {
            toast.success(`Entry from ${date} has been updated.`)
          },
        }
      )
    }
  }

  return (
    <Modal {...{ isOpen, setIsOpen, size: 'lg', isOverflow: transactions.length > 2 }}>
      <div className="font-bold text-xl mb-4">Create New Entry</div>
      <form className="w-96 flex flex-col gap-2">
        <DateInput />
        <DescriptionTextarea />
        <ReceiptInput />
      </form>
      <div className="form-control mt-2">
        <label className="label font-bold">
          <span className="label-text">Transactions</span>
        </label>
        <TransactionInputTable />
      </div>
      <div className="modal-action">
        <button className={`btn btn-ghost ${updateEntry.isLoading ? 'loading' : ''}`} onClick={() => setIsOpen(false)}>
          cancel
        </button>
        <button className={`btn btn-primary ${updateEntry.isLoading ? 'loading' : ''}`} onClick={() => onSubmitEntry()}>
          create
        </button>
      </div>
    </Modal>
  )
}
