import { numberToRupiah } from '@utils/numberToRupiah'
import React from 'react'

type Props = {
  transaction: Transaction
}

export const TransactionRow = ({ transaction }: Props) => {
  const { account, debit, credit } = transaction
  return (
    <>
      <td>{account!.number}</td>
      <td className="whitespace-nowrap">{account!.name}</td>
      <td className="text-right">{(debit || 0) > 0 && numberToRupiah(debit)}</td>
      <td className="text-right">{(credit || 0) > 0 && numberToRupiah(credit)}</td>
    </>
  )
}
