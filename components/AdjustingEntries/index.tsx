import FilterControls, { SelectYearOption } from '@components/JournalEntries/FilterControls'
import TableRow from './TableRow'
import { Table, TableHeader } from '@components/Table'
import { AdjustingEntry } from '@context/AdjustingEntryContext/types'
import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { AddAdjustingEntryModal } from './AddAdjustingEntryModal'
import { CURRENT_YEAR } from '@constants/.'
import { numberToRupiah } from '@utils/numberToRupiah'
import { sum } from '@utils/sum'

import * as XLSX from 'xlsx'
const { writeFile, utils } = XLSX

interface Props {}

export const Index = (props: Props) => {
  const [isOpen, setOpen] = useState(false)
  const [year, setYear] = useState<SelectYearOption[]>(years.filter((option) => option.value === CURRENT_YEAR))

  const currentCredit = sum(
    dummyAdjustingEntries.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.credit || 0), 0))
  )
  const currentDebit = sum(
    dummyAdjustingEntries.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.debit || 0), 0))
  )

  const flattenJson = (data: AdjustingEntry[]) => {
    var flatJson = []
    for (let entry of data) {
      for (let transaction of entry.transactions) {
        flatJson.push({
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
    var workbook = utils.book_new()
    var worksheet = utils.json_to_sheet(flattenJson(dummyAdjustingEntries))
    utils.book_append_sheet(workbook, worksheet, 'Adjusting Entries')
    return writeFile(workbook, `adjusting_entries_${year[0].value}.xlsx`)
  }

  return (
    <div className="flex flex-col gap-4">
      <FilterControls {...{ years, year, setYear, exportDocument }} />
      <Table zebra>
        <TableHeader cells={cells} />
        {dummyAdjustingEntries.map((entry, idx) => (
          <TableRow key={entry.id} idx={idx} entry={entry} isDateVisible={false} />
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
      <AddAdjustingEntryModal {...{ isOpen, setIsOpen: setOpen }} />
    </div>
  )
}

const cells: string[] = ['', 'acc no.', 'account name', 'debit', 'credit', 'description']

const years: SelectYearOption[] = [
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
]

const dummyAdjustingEntries: AdjustingEntry[] = [
  {
    id: 1,
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
    ],
  },
  {
    id: 2,
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
