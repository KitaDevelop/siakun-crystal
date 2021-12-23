import { Table, TableBody, TableHeader } from '@components/Table'
import { CURRENT_YEAR } from '@constants/.'
import { JournalEntry } from '@context/JournalEntryContext/types'
import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { AddJournalEntryModal } from './AddJournalEntryModal'
import FilterControls, { SelectYearOption } from './FilterControls'
import TableRow from './TableRow'
import { numberToRupiah } from 'services/utils/numberToRupiah'

import * as XLSX from 'xlsx'
const { write, utils } = XLSX

interface Props {}

export const Index = (props: Props) => {
  const [isOpen, setOpen] = useState(false)
  const [year, setYear] = useState<SelectYearOption[]>(years.filter((option) => option.value === CURRENT_YEAR))

  const sum = (arr: number[]): number => arr.reduce((a, b) => a + b, 0)

  const currentCredit = sum(
    dummyJournalEntries.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.credit || 0), 0))
  )
  const currentDebit = sum(
    dummyJournalEntries.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.debit || 0), 0))
  )

  const flattenJson = (data: JournalEntry[]) => {
    var flatJson = []
    for (let entry of data) {
      for (let transaction of entry.transactions) {
        flatJson.push({
          Tanggal: entry.date,
          'Nomor Akun': transaction.accNumber,
          'Nama Akun': transaction.accName,
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
    var workbook = XLSX.utils.book_new()
    var worksheet = XLSX.utils.json_to_sheet(flattenJson(dummyJournalEntries))
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Journal Entries')
    return XLSX.writeFile(workbook, 'journal_entries_2021.xlsx')
  }

  return (
    <div className="flex flex-col gap-4">
      <FilterControls {...{ years, year, setYear, exportDocument }} />
      <Table zebra>
        <TableHeader cells={cells} />
        {dummyJournalEntries.map((entry, idx) => (
          <TableRow key={entry.id} idx={idx} entry={entry} />
        ))}
        <tr className="text-center font-bold">
          <td colSpan={3} className="text-right">
            Total
          </td>
          <td>{numberToRupiah(currentCredit)}</td>
          <td>{numberToRupiah(currentDebit)}</td>
          <td></td>
        </tr>
      </Table>
      <button onClick={() => setOpen(true)} className="btn btn-circle fixed bottom-6 right-6 btn-primary">
        <IoAdd className="w-5 h-5" />
      </button>
      <AddJournalEntryModal {...{ isOpen, setIsOpen: setOpen }} />
    </div>
  )
}

const cells: string[] = ['date', 'acc no.', 'account name', 'debit', 'credit', 'description']

const years: SelectYearOption[] = [
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
]

const dummyJournalEntries: JournalEntry[] = [
  {
    id: 1,
    date: '11/14/2021', // mm/dd/yyyy
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio dolor voluptatum dolore repudiandae! Numquam eos, eaque aut maiores fugiat fuga.',
    transactions: [
      {
        id: 1,
        accName: 'Akun Debit Satu',
        accNumber: '1-1111',
        debit: 12000,
      },
      {
        id: 2,
        accName: 'Akun Kredit Dua',
        accNumber: '1-2222',
        credit: 25000,
      },
      {
        id: 3,
        accName: 'Akun Debit Tiga',
        accNumber: '1-3333',
        debit: 13000,
      },
    ],
  },
  {
    id: 2,
    date: new Date().toISOString(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio voluptas quibusdam provident facere soluta reprehenderit?',
    transactions: [
      {
        id: 4,
        accName: 'Akun Debit Satu',
        accNumber: '1-1111',
        debit: 9999999,
      },
      {
        id: 5,
        accName: 'Akun Kredit Dua',
        accNumber: '1-2222',
        credit: 9999999,
      },
    ],
  },
]

export default Index
