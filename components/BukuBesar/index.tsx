import FilterControls from '@components/FilterControls'
import TableRow from '@components/JournalEntries/TableRow'
import { Table, TableHeader } from '@components/Table'
import { Account } from '@context/AccountContext/types'
import { JournalEntry } from '@context/JournalEntryContext/types'
import { useYear } from '@hooks/useYear'
import { formatDate } from '@utils/formatDate'
import { numberToRupiah } from '@utils/numberToRupiah'
import { sum } from '@utils/sum'
import React, { useState } from 'react'

import * as XLSX from 'xlsx'
const { writeFile, utils } = XLSX

interface Props {
  data: Account
}

export const Index = ({ data }: Props) => {
  const { year } = useYear()
  const [searchQuery, setSearch] = useState('')

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
          Tanggal: formatDate(entry.date),
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
    var worksheet = utils.json_to_sheet(flattenJson(dummyJournalEntries))
    utils.book_append_sheet(workbook, worksheet, data.name)
    return writeFile(workbook, `buku_besar_${data.name}_${year}.xlsx`)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">{data.name}</h2>
      <FilterControls {...{ exportDocument, search: searchQuery, setSearch }} />
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
    </div>
  )
}

const cells: string[] = ['date', 'acc no.', 'account name', 'debit', 'credit', 'description']

export default Index
