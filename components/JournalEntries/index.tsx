import { Table, TableHeader } from '@components/Table'
import { JournalEntry } from '@context/JournalEntryContext/types'
import React, { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { AddJournalEntryModal } from './AddJournalEntryModal'
import FilterControls from '@components/FilterControls'
import { numberToRupiah } from '@utils//numberToRupiah'

import * as XLSX from 'xlsx'
import { formatDate } from '@utils/formatDate'
import { useYear } from '@hooks/useYear'
import { useFetchJournalEntries } from '@api/entries/journal'
import { useJournalEntry } from '@hooks/useJournalEntry'
import { sum } from '@utils/sum'
import EntryRow from './EntryRow'
import { LockedAlert, LockedToggleAlert } from '@components/LockedAlert'
import { Loader } from '@components/Loader'
import useAuth from '@hooks/useAuth'
import { ROLE } from '@context/AuthContext/types'
import { useOrganization } from '@hooks/useOrganization'
const { writeFile, utils } = XLSX


export const Index = () => {
  const { year } = useYear()
  const { organizationView } = useOrganization()
  const { userProfile } = useAuth()
  const { isLoading, isFetching, data, refetch } = useFetchJournalEntries(year, userProfile?.role != ROLE.LEMBAGA ? organizationView?.id : undefined)
  const { state: { isLocked }, dispatch } = useJournalEntry()

  const [isOpen, setOpen] = useState<boolean>(false)
  const [isBlank, setIsBlank] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    refetch()
  }, [year])

  useEffect(() => {
    if (data) {
      const { isLocked, data: entries_ } = data.data
      dispatch({ type: 'set_is_locked', isLocked: isLocked })
      setEntries(entries_)
    }
  }, [data])

  useEffect(() => {
    if (data) {
      const { data: entries_ } = data.data
      if (searchKeyword != '') setEntries(
        entries_.filter(
          (e) =>
            e.date.includes(searchKeyword) ||
            e.description.includes(searchKeyword) ||
            e.transactions.reduce((a: boolean, b) => a || b.account!.number.includes(searchKeyword), false)
        )
      )
      else setEntries(entries_)
    }
  }, [data, searchKeyword])

  const currentCredit = sum(entries?.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.credit || 0), 0)) || [])
  const currentDebit = sum(entries?.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.debit || 0), 0)) || [])

  const flattenJson = (data: JournalEntry[]) => {
    var flatJson = []
    for (let entry of data) {
      for (let t of entry.transactions) {
        flatJson.push({
          Tanggal: formatDate(entry.date),
          'Nomor Akun': t.account?.number,
          'Nama Akun': t.account?.name,
          Debit: t?.debit,
          Kredit: t?.credit,
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
    utils.book_append_sheet(workbook, worksheet, 'Journal Entries')
    return writeFile(workbook, `journal_entries_${year}.xlsx`)
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
      {isLoading || isFetching ? (
        <div className="w-full grid place-content-center h-80 text-accent">
          <Loader />
        </div>
      ) : (
        <>
          <Table zebra>
            <TableHeader cells={cells} />
            {entries.map((entry, idx) => (
              <EntryRow key={entry.id} {...{ idx, entry, isLocked, openModalToEdit, reloadTable: refetch }} />
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
          <button onClick={() => openModalToCreate()} className="btn btn-circle fixed bottom-6 right-6 btn-primary">
            <IoAdd className="w-5 h-5" />
          </button>
          <AddJournalEntryModal {...{ isBlank, isOpen, reloadTable: refetch, setIsOpen: setOpen }} />
        </>
      )}
    </div>
  )
}

const cells: string[] = ['date', 'acc no.', 'account name', 'debit', 'credit', 'description']

export default Index
