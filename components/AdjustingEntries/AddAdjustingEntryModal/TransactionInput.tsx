import { customStyles, dummyAccounts } from '@components/ChartOfAccounts/AddAccountModal/Select'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { IoTrashOutline } from 'react-icons/io5'
import { useAdjustingEntry } from '@context/AdjustingEntryContext/AdjustingEntryProvider'

interface Props {
  isOnlyChild: boolean
  idx: number
}

export const TransactionInput = ({ isOnlyChild, idx }: Props) => {
  const {
    state: { transactions },
    dispatch,
  } = useAdjustingEntry()
  const [isDebit, setIsDebit] = useState(true)
  const [debit, setDebit] = useState(0)
  const [credit, setCredit] = useState(0)

  useEffect(() => {
    const tmpTransactions = [...transactions]
    tmpTransactions[idx] = {
      ...tmpTransactions[idx],
      ...(isDebit ? { debit } : { credit }),
    }
    dispatch({ type: 'set_transactions', transactions: tmpTransactions })
  }, [debit, credit])

  const onTransactionDelete = () => {
    const tmpTransactions = [...transactions]
    tmpTransactions.splice(idx, 1)
    dispatch({ type: 'set_transactions', transactions: tmpTransactions })
  }

  return (
    <tr>
      <td className="w-48 min-w-full">
        <Select
          options={dummyAccounts}
          placeholder="Select Account"
          styles={customStyles}
          closeMenuOnSelect
          isSearchable
        />
      </td>
      <td>
        <div className="relative">
          <button
            onClick={() => setIsDebit(true)}
            className="absolute top-0 left-0 rounded-r-none btn btn-sm btn-ghost bg-base-300 normal-case"
          >
            Rp
          </button>
          <input
            type="number"
            disabled={!isDebit}
            min={0}
            value={debit > 0 ? debit : ''}
            onChange={(e) => setDebit(parseInt(e.target.value))}
            placeholder="Enter Debit"
            className="w-full pl-12 input input-sm input-bordered"
          />
        </div>
      </td>
      <td>
        <div className="relative">
          <button
            onClick={() => setIsDebit(false)}
            className="absolute top-0 left-0 rounded-r-none btn btn-sm btn-ghost bg-base-300 normal-case"
          >
            Rp
          </button>
          <input
            type="number"
            disabled={isDebit}
            min={0}
            value={credit > 0 ? credit : ''}
            onChange={(e) => setCredit(parseInt(e.target.value))}
            placeholder="Enter Credit"
            className="w-full pl-12 input input-sm input-bordered"
          />
        </div>
      </td>
      <td>
        {!isOnlyChild && (
          <div onClick={onTransactionDelete} className="btn btn-sm btn-error btn-outline btn-circle">
            <IoTrashOutline className="text-base" />
          </div>
        )}
      </td>
    </tr>
  )
}
