import { customStyles } from '@components/ChartOfAccounts/AddAccountModal/Select'
import { SelectYearOption } from '@constants/years'
import { JournalEntry } from '@context/JournalEntryContext/types'
import React, { ReactElement } from 'react'
import { BiDownload } from 'react-icons/bi'
import { HiOutlineSearch } from 'react-icons/hi'
import Select from 'react-select'

interface Props {
  years: SelectYearOption[]
  year: SelectYearOption[]
  setYear: (v: SelectYearOption[]) => void
  exportDocument: () => void
}

export default function FilterControls({ years, year, setYear, exportDocument }: Props): ReactElement {
  const isSelectYearOption = (v: any): v is SelectYearOption => {
    if ((v as SelectYearOption).value !== undefined) return v.value
    return false
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="form-control w-96">
          <div className="relative">
            <button className="absolute top-0 left-0 rounded-r-none btn btn-ghost">
              <HiOutlineSearch className="h-5 w-5" />
            </button>
            <input type="text" placeholder="Search" className="w-full pl-12 input input-bordered" />
          </div>
        </div>
        <div className="btn btn-outline" onClick={() => exportDocument()}>
          <BiDownload className="w-5 h-5 mr-2" />
          Export
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="label font-bold">
          <span className="label-text">Year:</span>
        </label>
        <Select
          options={years}
          value={year}
          styles={customStyles}
          closeMenuOnSelect
          isSearchable
          onChange={(v) => {
            if (isSelectYearOption(v)) setYear([v])
          }}
        />
      </div>
    </div>
  )
}
