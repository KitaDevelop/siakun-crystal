import { BalanceRow, TrialBalanceRow } from '@context/TrialBalanceContext/types'
import React from 'react'
import { numberToRupiah } from '@utils//numberToRupiah'

export const TableRow = ({ content }: TrialBalanceRow) => {
  const row = content as BalanceRow
  return (
    <>
      <td className="text-center">{row.accountNumber}</td>
      <td className="whitespace-normal text-left">{row.accountName}</td>
      <td>{numberToRupiah(row.startBalance) || '-'}</td>
      <td>{numberToRupiah(row.movement.debit) || '-'}</td>
      <td>{numberToRupiah(row.movement.credit) || '-'}</td>
      <td>{numberToRupiah(row.endBalance) || '-'}</td>
      <td>{numberToRupiah(row.adjustment.debit) || '-'}</td>
      <td>{numberToRupiah(row.adjustment.credit) || '-'}</td>
      <td>{numberToRupiah(row.adjustedBalance) || '-'}</td>
    </>
  )
}
