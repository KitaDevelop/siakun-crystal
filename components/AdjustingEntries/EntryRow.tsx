import { TableBody } from '@components/Table'
import { AdjustingEntry } from '@context/AdjustingEntryContext/types'
import React, { Fragment, ReactElement, useState } from 'react'
import { numberToRupiah } from '@utils//numberToRupiah'
import { useDeleteAdjustingEntry } from '@api/entries/adjusting'
import { useYear } from '@hooks/useYear'
import toast from 'react-hot-toast'
import { FiMoreVertical } from 'react-icons/fi'
import { MdOutlineEdit } from 'react-icons/md'
import { IoTrashOutline } from 'react-icons/io5'
import { useAdjustingEntry } from '@hooks/useAdjustingEntry'
import { ConfirmationDialog } from '@components/ConfirmationDialog'

interface Props {
  idx: number
  entry: AdjustingEntry
  openModalToEdit: (id: number) => void
  reloadTable: () => void
}
export default function EntryRow({
  idx,
  openModalToEdit,
  reloadTable,
  entry: { id, description, transactions },
}: Props): ReactElement {
  const { year } = useYear()
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const { state: { isLocked } } = useAdjustingEntry()
  const deleteEntry = useDeleteAdjustingEntry()

  const onEditEntry = () => {
    openModalToEdit(id)
  }

  const onDeleteEntry = () => {
    deleteEntry.mutate(
      { id, year },
      {
        onSuccess: () => {
          reloadTable()
          toast.success(`Entry has been deleted.`)
        },
      }
    )
  }

  return (
    <TableBody className="group hover multirow">
      {idx % 2 === 0 && <tr></tr>}
      {!isLocked && (
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
              <li>
                <a onClick={onEditEntry}>
                  <MdOutlineEdit className="w-5 h-5 mr-2" />
                  Edit Entry
                </a>
              </li>
              <li>
                <a onClick={() => setIsOpenDialog(true)}>
                  <IoTrashOutline className="w-5 h-5 mr-2" />
                  Delete Entry
                </a>
              </li>
            </ul>
            <ConfirmationDialog
              isOpen={isOpenDialog}
              setIsOpen={setIsOpenDialog}
              onConfirm={() => onDeleteEntry()}
              confirmMessage="Yes, delete">
              <div className="font-medium text-stone-700 text-lg">Are you sure you want to delete this entry?</div>
            </ConfirmationDialog>
          </td>
        </tr>
      )}
      <tr className="text-center">
        <td rowSpan={transactions.length * 2 - 1}></td>
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
              <td>{t.account!.number}</td>
              <td className="whitespace-nowrap">{t.account!.name}</td>
              <td className="text-right">{(t?.debit || 0) > 0 && numberToRupiah(t?.debit)}</td>
              <td className="text-right">{(t?.credit || 0) > 0 && numberToRupiah(t?.credit)}</td>
            </tr>
          </Fragment>
        ))}
    </TableBody>
  )
}
