import { BalanceRow, TrialBalanceRow } from '@context/TrialBalanceContext/types'
import React from 'react'
import { numberToRupiah } from '@utils//numberToRupiah'

export const TableRow = ({ content }: TrialBalanceRow) => {
  const row = content as BalanceRow
  return (
    <>
      <td className="text-center">{row.accountNo}</td>
      <td className="whitespace-normal text-left">{row.accountName}</td>
      <td>{row?.startBalance ? numberToRupiah(row.startBalance) : '-'}</td>
      <td>{row?.movement.debit ? numberToRupiah(row.movement.debit) : '-'}</td>
      <td>{row?.movement.credit ? numberToRupiah(row.movement.credit) : '-'}</td>
      <td>{row?.endBalance ? numberToRupiah(row.endBalance) : '-'}</td>
      <td>{row?.adjustment.debit ? numberToRupiah(row.adjustment.debit) : '-'}</td>
      <td>{row?.adjustment.credit ? numberToRupiah(row.adjustment.credit) : '-'}</td>
      <td>{row?.adjustedBalance ? numberToRupiah(row.adjustedBalance) : '-'}</td>
    </>
  )
}
