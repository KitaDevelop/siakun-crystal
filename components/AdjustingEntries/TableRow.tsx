import { TableBody } from '@components/Table'
import { AdjustingEntry } from '@context/AdjustingEntryContext/types'
import React, { ReactElement } from 'react'
import { numberToRupiah } from '@utils//numberToRupiah'

interface Props {
  idx: number
  entry: AdjustingEntry
}
export default function TableRow({ idx, entry: { description, transactions } }: Props): ReactElement {
  return (
    <TableBody className="hover multirow">
      {idx % 2 !== 0 && <tr></tr>}
      <tr className="text-center">
        <td rowSpan={transactions.length * 2 - 1}></td>
        {transactions.length > 0 &&
          transactions.slice(0, 1).map((t) => (
            <React.Fragment key={t.accNumber}>
              <td>{t.accNumber}</td>
              <td className="whitespace-nowrap">{t.accName}</td>
              <td>{numberToRupiah(t?.debit)}</td>
              <td>{numberToRupiah(t?.credit)}</td>
            </React.Fragment>
          ))}
        <td rowSpan={transactions.length * 2 - 1} className="max-w-sm text-left">
          {description}
        </td>
      </tr>
      {transactions.length > 1 &&
        transactions.slice(1).map((t) => (
          <React.Fragment key={t.accNumber}>
            <tr></tr>
            <tr className="text-center">
              <td>{t.accNumber}</td>
              <td className="whitespace-nowrap">{t.accName}</td>
              <td>{numberToRupiah(t?.debit)}</td>
              <td>{numberToRupiah(t?.credit)}</td>
            </tr>
          </React.Fragment>
        ))}
    </TableBody>
  )
}
