import FilterControls from '@components/FilterControls'
import { Table, TableHeader } from '@components/Table'
import { AdjustingEntry } from '@context/AdjustingEntryContext/types'
import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { AddAdjustingEntryModal } from './AddAdjustingEntryModal'
import { numberToRupiah } from '@utils/numberToRupiah'
import { sum } from '@utils/sum'

import * as XLSX from 'xlsx'
import { useYear } from '@hooks/useYear'
import { useFetchAdjustingEntries } from '@api/entries/adjusting'
import { useAdjustingEntry } from '@hooks/useAdjustingEntry'
import EntryRow from './EntryRow'
import { LockedAlert, LockedToggleAlert } from '@components/LockedAlert'
import { Loader } from '@components/Loader'
import { useOrganization } from '@hooks/useOrganization'
import useAuth from '@hooks/useAuth'
import { ROLE } from '@context/AuthContext/types'
const { writeFile, utils } = XLSX

export const Index = () => {
  const { year } = useYear()
  const { organizationView } = useOrganization()
  const { userProfile } = useAuth()

  const { isLoading, isSuccess, data, refetch } = useFetchAdjustingEntries(year, userProfile?.role != ROLE.LEMBAGA ? organizationView?.id : undefined)
  const { state: { isLocked }, dispatch } = useAdjustingEntry()

  const [isOpen, setOpen] = useState(false)
  const [isBlank, setIsBlank] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [entries, setEntries] = useState<AdjustingEntry[]>([])

  useEffect(() => {
    refetch()
  }, [year])

  useEffect(() => {
    if (isSuccess && data) {
      const { isLocked: isLocked_, data: entries_ } = data.data
      dispatch({ type: 'set_is_locked', isLocked: isLocked_ })
      setEntries(entries_)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      const { data: entries_ } = data.data
      if (searchKeyword != '') setEntries(
        entries_.filter(
          (e) =>
            e.description.includes(searchKeyword) ||
            e.transactions.reduce((a: boolean, b) => a || b.account!.number.includes(searchKeyword), false)
        )
      )
      else setEntries(entries_)
    }
  }, [searchKeyword])


  const currentCredit = sum(entries.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.credit || 0), 0)))
  const currentDebit = sum(entries.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.debit || 0), 0)))

  const flattenJson = (data: AdjustingEntry[]) => {
    var flatJson = []
    for (let entry of data) {
      for (let transaction of entry.transactions) {
        flatJson.push({
          'Nomor Akun': transaction.account!.name,
          'Nama Akun': transaction.account!.number,
          Debit: transaction?.debit,
          Kredit: transaction?.credit,
          Deskripsi: entry.description,
        })
      }
    }
    flatJson.push({
      'Nama Akun': 'TOTAL',
      Debit: currentDebit,
      Kredit: currentCredit,
    })
    return flatJson
  }

  const exportDocument = () => {
    var workbook = utils.book_new()
    var worksheet = utils.json_to_sheet(flattenJson(entries))
    utils.book_append_sheet(workbook, worksheet, 'Adjusting Entries')
    return writeFile(workbook, `adjusting_entries_${year}.xlsx`)
  }

  const openModalToCreate = () => {
    setIsBlank(true)
    setOpen(true)
  }

  const openModalToEdit = (targetId: number) => {
    dispatch({ type: 'set_id', id: targetId })
    setIsBlank(false)
    setOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      {userProfile?.role == ROLE.LEMBAGA ?
        isLocked && <LockedAlert />
        : <LockedToggleAlert {...{ isLocked, toggleLocked: () => dispatch({ type: 'set_is_locked', isLocked: !isLocked }) }} />
      }
      <FilterControls {...{ exportDocument, searchKeyword, setSearchKeyword }} />
      {isLoading && !isSuccess ? (
        <div className="w-full grid place-content-center h-80 text-accent">
          <Loader />
        </div>
      ) : (
        <>
          <Table zebra>
            <TableHeader cells={cells} />
            {entries.map((entry, idx) => (
              <EntryRow key={entry.id}  {...{ idx, entry, openModalToEdit, reloadTable: refetch }} />
            ))}
            {entries.length > 0 && (
              <tr className="text-center font-bold">
                <td colSpan={3} className="text-right uppercase">
                  Total
                </td>
                <td className="text-right text-green-900 bg-success bg-opacity-10 rounded-l-lg">
                  {numberToRupiah(currentDebit)}
                </td>
                <td className="text-right text-red-900 bg-error bg-opacity-10 rounded-r-lg">
                  {numberToRupiah(currentCredit)}
                </td>
                <td></td>
              </tr>
            )}
          </Table>
          {entries && entries.length == 0 && (
            <div className="card w-full bg-base-200 p-8 text-center items-center">
              No entries registered yet.{' '}
              <div className="btn btn-primary mt-3" onClick={() => setOpen(true)}>
                create entry
              </div>
            </div>
          )}
        </>
      )}

      {userProfile?.role === ROLE.LEMBAGA && !isLocked && (
        <>
          <button onClick={openModalToCreate} className="btn btn-circle fixed bottom-6 right-6 btn-primary">
            <IoAdd className="w-5 h-5" />
          </button>
          <AddAdjustingEntryModal {...{ isBlank, isOpen, reloadTable: refetch, setIsOpen: setOpen }} />
        </>
      )}
    </div>
  )
}

const cells: string[] = ['', 'acc no.', 'account name', 'debit', 'credit', 'description']

export default Index
