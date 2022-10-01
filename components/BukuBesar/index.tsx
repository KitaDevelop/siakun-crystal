import { Table, TableHeader } from '@components/Table'
import { formatDate } from '@utils/formatDate'
import { numberToRupiah } from '@utils/numberToRupiah'
import { sum } from '@utils/sum'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiDownload } from 'react-icons/bi'
import { HiOutlineSearch } from 'react-icons/hi'

import * as XLSX from 'xlsx'
import { EntryRowReadonly } from './EntryRowReadonly'
const { writeFile, utils } = XLSX

interface Props {
  account: Account
  entries: JournalEntry[]
}

export const Index = ({ account, entries }: Props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const currentCredit = sum(
    entries?.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.credit || 0), 0)) || []
  )
  const currentDebit = sum(
    entries?.map((x) => x.transactions.reduce((acc: number, t) => acc + (t?.debit || 0), 0)) || []
  )

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
    return writeFile(workbook, `${account.name}.xlsx`)
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl">{account.name}</h2>
      <div className="flex gap-2">
        <div className="form-control w-96">
          <div className="relative">
            <div className="absolute top-0 left-0 rounded-r-none btn btn-ghost hover:bg-transparent">
              <HiOutlineSearch className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-12 input input-bordered"
            />
          </div>
        </div>
        <div className="btn btn-outline" onClick={() => exportDocument()}>
          <BiDownload className="w-5 h-5 mr-2" />
          Export
        </div>
      </div>
      <Table zebra>
        <TableHeader cells={cells} />
        {entries && entries.map((entry, idx) => <EntryRowReadonly key={entry.id} idx={idx} entry={entry} />)}
        {entries && entries.length > 0 && (
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
      {!entries && (
        <div className="card w-full bg-base-200 p-8 text-center items-center">
          <span>No entries registered yet.</span>
          <span>You can create a new entry from the Journal Entry page.</span>
          <Link href="/journal-entries">
            <a className="btn btn-primary mt-3">go to journal entry</a>
          </Link>
        </div>
      )}
    </div>
  )
}

const cells: string[] = ['date', 'acc no.', 'account name', 'debit', 'credit', 'description']

export default Index
