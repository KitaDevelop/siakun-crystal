import React, { ReactElement } from 'react'
import { BiDownload } from 'react-icons/bi'
import { HiOutlineSearch } from 'react-icons/hi'
import { YearSelector } from './YearSelect'

interface Props {
  search: string
  setSearch: (s: string) => void
  isCanExport?: boolean
  exportDocument?: () => void
}

export default function FilterControls({ isCanExport = true, exportDocument, search, setSearch }: Props): ReactElement {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="form-control w-96">
          <div className="relative">
            <div className="absolute top-0 left-0 rounded-r-none btn btn-ghost hover:bg-transparent">
              <HiOutlineSearch className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 input input-bordered"
            />
          </div>
        </div>
        {isCanExport && exportDocument && (
          <div className="btn btn-outline" onClick={() => exportDocument()}>
            <BiDownload className="w-5 h-5 mr-2" />
            Export
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <label className="label font-bold">
          <span className="label-text">Year:</span>
        </label>
        <YearSelector />
      </div>
    </div>
  )
}
