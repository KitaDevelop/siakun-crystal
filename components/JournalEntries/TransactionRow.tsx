import { Transaction } from '@context/JournalEntryContext/types'
import { useAccount } from '@hooks/useAccount'
import { findAccountNameByNumber } from '@utils/findAccountNameByNumber'
import { numberToRupiah } from '@utils/numberToRupiah'
import React from 'react'

type Props = {
  transaction: Transaction
}

export const TransactionRow = ({ transaction }: Props) => {
  const { accounts } = useAccount()

  return (
    <>
      <td>{transaction.accountNumber}</td>
      <td className="whitespace-nowrap">{findAccountNameByNumber(accounts, transaction.accountNumber)}</td>
      <td className="text-right">{(transaction?.debit || 0) > 0 && numberToRupiah(transaction?.debit)}</td>
      <td className="text-right">{(transaction?.credit || 0) > 0 && numberToRupiah(transaction?.credit)}</td>
    </>
  )
}
