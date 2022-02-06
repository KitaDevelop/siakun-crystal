import { useCreateJournalEntry, useFetchJournalEntry, useUpdateJournalEntry } from '@api/entries/journal'
import { Modal } from '@components/Modal'
import { useJournalEntry } from '@hooks/useJournalEntry'
import { useYear } from '@hooks/useYear'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'
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
  const { isLoading, data, refetch, isRefetching } = useFetchJournalEntry(id, year)
  const createEntry = useCreateJournalEntry()
  const updateEntry = useUpdateJournalEntry()

  useEffect(() => {
    if (isBlank) {
      dispatch({ type: 'set_empty' })
    } else {
      refetch()
    }
  }, [isBlank, id])

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
    <Modal {...{ isOpen, setIsOpen, size: 'lg', isOverflow: true }}>
      <div className="font-bold text-xl mb-4">Create New Entry</div>
      {!isBlank && (isLoading || isRefetching) ? (
        <div className="w-full grid place-content-center h-80 text-accent">
          <FaSpinner className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <>
          <form className="w-96 flex flex-col gap-2">
            <DateInput />
            <DescriptionTextarea />
            <ReceiptInput {...{ isOpen, isBlank }} />
          </form>
          <div className="form-control mt-2">
            <label className="label font-bold pb-1">
              <span className="label-text">Transactions</span>
            </label>
            <span className="text-xs text-gray-400 pb-2 ml-1">
              Click the Rp button to switch between debit and credit.
            </span>
            <TransactionInputTable />
          </div>
        </>
      )}
      <div className="modal-action">
        <button className={`btn btn-ghost ${updateEntry.isLoading ? 'disabled' : ''}`} onClick={() => setIsOpen(false)}>
          cancel
        </button>
        <button className={`btn btn-primary ${updateEntry.isLoading ? 'loading' : ''}`} onClick={() => onSubmitEntry()}>
          {isBlank ? 'create' : 'edit'}
        </button>
      </div>
    </Modal>
  )
}
