import { TableBody } from '@components/Table'
import { JournalEntry } from '@context/JournalEntryContext/types'
import React, { Fragment, ReactElement } from 'react'
import { numberToRupiah } from '@utils//numberToRupiah'
import { formatDate } from '@utils/formatDate'
import { useAccount } from '@hooks/useAccount'
import { findAccountNameByNumber } from '@utils/findAccountNameByNumber'
import { TransactionRow } from './TransactionRow'

interface Props {
  idx: number
  entry: JournalEntry
}
export default function EntryRow({ idx, entry: { date, description, transactions } }: Props): ReactElement {
  const { accounts } = useAccount()

  return (
    <TableBody className="hover multirow">
      {idx % 2 !== 0 && <tr></tr>}
      <tr className="text-center">
        <td rowSpan={transactions.length * 2 - 1}>{formatDate(date)}</td>
        {transactions.length > 0 &&
          transactions.slice(0, 1).map((t) => (
            <React.Fragment key={t.accountNumber}>
              <td>{t.accountNumber}</td>
              <td className="whitespace-nowrap">{findAccountNameByNumber(accounts, t.accountNumber)}</td>
              <td className="text-right">{(t?.debit || 0) > 0 && numberToRupiah(t?.debit)}</td>
              <td className="text-right">{(t?.credit || 0) > 0 && numberToRupiah(t?.credit)}</td>
            </React.Fragment>
          ))}
        <td rowSpan={transactions.length * 2 - 1} className="max-w-sm text-left">
          {description}
        </td>
      </tr>
      {transactions.length > 1 &&
        transactions.slice(1).map((t) => (
          <Fragment key={t.accountNumber}>
            <tr></tr>
            <tr className="text-center">
              <TransactionRow transaction={t} />
            </tr>
          </Fragment>
        ))}
    </TableBody>
  )
}
