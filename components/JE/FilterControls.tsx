import React, { ReactElement } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import Select, { CSSObjectWithLabel } from 'react-select'

interface Props {
  years: SelectYearOption[]
  year: SelectYearOption[]
  setYear: (v: SelectYearOption[]) => void
}

export type SelectYearOption = {
  label: string
  value: number
}

export default function FilterControls({ years, year, setYear }: Props): ReactElement {
  const isSelectYearOption = (v: any): v is SelectYearOption => {
    if ((v as SelectYearOption).value !== undefined) return v.value
    return false
  }

  return (
    <div className="flex justify-between">
      <div className="form-control w-96">
        <div className="relative">
          <button className="absolute top-0 left-0 rounded-r-none btn btn-ghost">
            <HiOutlineSearch className="h-5 w-5" />
          </button>
          <input type="text" placeholder="Search" className="w-full pl-12 input input-bordered" />
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

const customStyles = {
  placeholder: (styles: CSSObjectWithLabel) => ({ ...styles, lineHeight: 2, fontSize: '0.875rem' }),
  control: (styles: CSSObjectWithLabel) => ({ ...styles, borderRadius: 8 }),
}
