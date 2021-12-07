import { Account } from '@api/accounts'
import FilterControls, { SelectYearOption } from '@components/JournalEntries/FilterControls'
import TableRow from '@components/JournalEntries/TableRow'
import { Table, TableHeader } from '@components/Table'
import { CURRENT_YEAR } from '@constants/.'
import { JournalEntry } from '@context/JournalEntryContext/types'
import React, { useState } from 'react'

interface Props {
  data: Account
}

export const Index = ({ data }: Props) => {
  const [year, setYear] = useState<SelectYearOption[]>(years.filter((option) => option.value === CURRENT_YEAR))

  const dummyJournalEntries: JournalEntry[] = [
    {
      id: 1,
      date: '11/14/2021', // mm/dd/yyyy
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio dolor voluptatum dolore repudiandae! Numquam eos, eaque aut maiores fugiat fuga.',
      transactions: [
        {
          id: 1,
          accName: data.name,
          accNumber: '1-1111',
          debit: 12000,
        },
        {
          id: 3,
          accName: 'Akun Debit Tiga',
          accNumber: '1-3333',
          credit: 12000,
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
          accName: data.name,
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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">{data.name}</h2>
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

export default Index
