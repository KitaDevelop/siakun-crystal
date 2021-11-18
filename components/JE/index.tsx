import { Table, TableBody, TableHeader } from '@components/Table'
import React, { useState } from 'react'
import FilterControls, { SelectYearOption } from './FilterControls'
import TableRow, { JournalEntry } from './TableRow'

interface Props {}

export const Index = (props: Props) => {
  const [year, setYear] = useState<SelectYearOption[]>(
    years.filter((option) => option.value === new Date().getFullYear())
  )

  return (
    <div className="flex flex-col gap-4">
      <FilterControls {...{ years, year, setYear }} />
      <Table zebra>
        <TableHeader cells={cells} />
        {dummyJournalEntries.map((entry, idx) => (
          <TableRow key={entry.id} idx={idx} entry={entry} />
        ))}
      </Table>
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
        accName: 'Akun Debit Satu',
        accNumber: '1-1111',
        debit: 12000,
      },
      {
        accName: 'Akun Kredit Dua',
        accNumber: '1-2222',
        credit: 25000,
      },
      {
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
        accName: 'Akun Debit Satu',
        accNumber: '1-1111',
        debit: 9999999,
      },
      {
        accName: 'Akun Kredit Dua',
        accNumber: '1-2222',
        credit: 9999999,
      },
    ],
  },
]

export default Index
