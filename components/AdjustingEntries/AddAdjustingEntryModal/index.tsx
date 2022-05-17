import { useCreateAdjustingEntry, useFetchAdjustingEntry, useUpdateAdjustingEntry } from '@api/entries/adjusting'
import { Loader } from '@components/Loader'
import { Modal } from '@components/Modal'
import { useAdjustingEntry } from '@hooks/useAdjustingEntry'
import { useYear } from '@hooks/useYear'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import DescriptionTextarea from './DescriptionTextarea'
import { TransactionInputTable } from './TransactionInputTable'

interface Props {
  isBlank: boolean
  isOpen: boolean
  setIsOpen: Function
  reloadTable: Function
}

export const AddAdjustingEntryModal = ({ isBlank, isOpen, setIsOpen, reloadTable }: Props) => {
  const { year } = useYear()
  const {
    state: { id, description, transactions },
    dispatch,
  } = useAdjustingEntry()
  const { isLoading, data, refetch } = useFetchAdjustingEntry(id, year)
  const createEntry = useCreateAdjustingEntry()
  const updateEntry = useUpdateAdjustingEntry()

  useEffect(() => {
    if (isBlank) {
      dispatch({ type: 'set_empty' })
    } else {
      refetch()
    }
  }, [isBlank, id])

  useEffect(() => {
    if (!isBlank && !isLoading && data) {
      const { data: entry } = data.data
      dispatch({ type: 'set_entry', entry: entry })
    }
  }, [isLoading, data])

  const onSubmitEntry = async () => {
    let payload = {
      description,
      transactions: transactions.map((t) => {
        let { accountNumber, debit, credit } = t
        return {
          accountNumber,
          debit: debit || 0,
          credit: credit || 0,
        }
      }),
    }
    if (isBlank) {
      createEntry.mutate(
        { year, entry: payload },
        {
          onSuccess: () => {
            reloadTable()
            setIsOpen(false)
            toast.success(`Created adjusting entry.`)
          },
        }
      )
    } else {
      updateEntry.mutate(
        { id, year, entry: payload },
        {
          onSuccess: () => {
            reloadTable()
            setIsOpen(false)
            toast.success(`Entry has been updated.`)
          },
        }
      )
    }
  }
  return (
    <Modal {...{ isOpen, setIsOpen, size: 'lg', isOverflow: transactions.length > 2 }}>
      <div className="font-bold text-xl mb-4">{isBlank ? "Create New" : "Edit"} Adjusting Entry</div>
      {!isBlank && isLoading ? (
        <div className="w-full grid place-content-center h-80 text-accent">
          <Loader />
        </div>
      ) : (
        <>
          <form className="w-96 flex flex-col gap-2">
            <DescriptionTextarea />
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
