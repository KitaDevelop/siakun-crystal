import { TransactionRow } from '@components/JournalEntries/TransactionRow'
import { TableBody } from '@components/Table'
import { JournalEntry } from '@context/JournalEntryContext/types'
import { downloadFile } from '@utils/downloadFile'
import { formatDate } from '@utils/formatDate'
import { numberToRupiah } from '@utils/numberToRupiah'
import React, { Fragment } from 'react'
import { FiDownload, FiMoreVertical } from 'react-icons/fi'

type Props = {
  idx: number
  entry: JournalEntry
}

export const EntryRowReadonly = ({ idx, entry: { id, date, description, receipt, transactions } }: Props) => {
  return (
    <TableBody className="group hover multirow">
      {idx % 2 === 0 && <tr></tr>}
      <tr className="invisible group-hover:visible absolute -left-5">
        <td className="dropdown">
          <div className="relative">
            <div tabIndex={0} className="handle relative text-gray-400 hover:bg-gray-100 btn btn-xs btn-ghost">
              <FiMoreVertical className="absolute w-5 h-5" style={{ left: '-5px' }} />
              <FiMoreVertical className="absolute  w-5 h-5" style={{ left: '1px' }} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="p-2 shadow menu compact bg-base-100 overflow-visible rounded-box w-52 dropdown-content"
          >
            {receipt && <li>
              <a onClick={() => downloadFile(receipt)} >
                <FiDownload className="w-5 h-5 mr-2" />
                Download Receipt
              </a>
            </li>}
          </ul>
        </td>
      </tr>
      <tr className="text-center">
        <td rowSpan={transactions.length * 2 - 1}>{formatDate(date)}</td>
        {transactions.length > 0 &&
          transactions.slice(0, 1).map((t) => (
            <Fragment key={t.account!.number}>
              <td>{t.account!.number}</td>
              <td className="whitespace-nowrap">{t.account!.name}</td>
              <td className="text-right">{(t?.debit || 0) > 0 && numberToRupiah(t?.debit)}</td>
              <td className="text-right">{(t?.credit || 0) > 0 && numberToRupiah(t?.credit)}</td>
            </Fragment>
          ))}
        <td rowSpan={transactions.length * 2 - 1} className="max-w-sm text-left">
          {description}
        </td>
      </tr>
      {transactions.length > 1 &&
        transactions.slice(1).map((t) => (
          <Fragment key={t.account!.number}>
            <tr></tr>
            <tr className="text-center">
              <TransactionRow transaction={t} />
            </tr>
          </Fragment>
        ))}
    </TableBody>
  )
}
