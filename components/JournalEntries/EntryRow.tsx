import { TableBody } from '@components/Table'
import { JournalEntry } from '@context/JournalEntryContext/types'
import React, { Fragment, ReactElement } from 'react'
import { numberToRupiah } from '@utils//numberToRupiah'
import { formatDate } from '@utils/formatDate'
import { TransactionRow } from './TransactionRow'
import { FiMoreVertical, FiDownload } from 'react-icons/fi'
import { MdOutlineEdit } from 'react-icons/md'
import { IoTrashOutline } from 'react-icons/io5'
import { useDeleteJournalEntry } from '@api/entries/journal'
import { useYear } from '@hooks/useYear'
import toast from 'react-hot-toast'
import { downloadFile } from '@utils/downloadFile'

interface Props {
  idx: number
  entry: JournalEntry
  openModalToEdit: (id: number) => void
}
export default function EntryRow({
  idx,
  openModalToEdit,
  entry: { id, date, description, receipt, transactions },
}: Props): ReactElement {
  const { year } = useYear()
  const deleteEntry = useDeleteJournalEntry()

  const onEditEntry = () => {
    openModalToEdit(id)
  }

  const onDeleteEntry = () => {
    deleteEntry.mutate(
      { id, year },
      {
        onSuccess: () => {
          toast.success(`Entry from ${date} has been deleted.`)
        },
      }
    )
  }

  return (
    <TableBody className="group hover multirow">
      {idx % 2 === 0 && <div></div>}
      <div className="invisible group-hover:visible absolute -left-5">
        <div className="dropdown">
          <div className="relative top-2">
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
            <li>
              <a onClick={() => onEditEntry()}>
                <MdOutlineEdit className="w-5 h-5 mr-2" />
                Edit Entry
              </a>
            </li>
            <li>
              <a onClick={() => onDeleteEntry()}>
                <IoTrashOutline className="w-5 h-5 mr-2" />
                Delete Entry
              </a>
            </li>
          </ul>
        </div>
      </div>
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
