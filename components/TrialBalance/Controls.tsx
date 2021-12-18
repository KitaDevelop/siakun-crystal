import React from 'react'
import { BiDownload, BiEdit, BiSave } from 'react-icons/bi'
import { customStyles } from '@components/ChartOfAccounts/AddAccountModal/Select'
import Select from 'react-select'
import { SelectYearOption } from '@components/JournalEntries/FilterControls'

interface Props {
  isEditing: Boolean
  years?: SelectYearOption[]
  year?: SelectYearOption[]
  position: 'top' | 'bottom'
  setIsEditing: (v: boolean) => void
  setYear?: (v: SelectYearOption[]) => void
}

export const Controls = ({ isEditing, setIsEditing, year, years, setYear, position = 'top' }: Props) => {
  const isSelectYearOption = (v: any): v is SelectYearOption => {
    if ((v as SelectYearOption).value !== undefined) return v.value
    return false
  }

  return (
    <div className={`flex ${position === 'top' ? 'justify-between mb-4' : 'justify-end mt-4'} `}>
      {isEditing ? (
        <div className={`flex ${position === 'bottom' && 'flex-row-reverse'}`}>
          <div className="btn btn-primary" onClick={() => setIsEditing(false)}>
            <BiSave className="w-5 h-5 mr-2" /> Save
          </div>
          <div className="btn btn-ghost text-secondary mx-2" onClick={() => setIsEditing(false)}>
            Cancel
          </div>
        </div>
      ) : (
        <div className={`flex ${position === 'bottom' && 'flex-row-reverse'}`}>
          <div className="btn btn-primary">
            <BiDownload className="w-5 h-5 mr-2" /> Export
          </div>
          <div className="btn btn-primary btn-outline mx-2" onClick={() => setIsEditing(true)}>
            <BiEdit className="w-5 h-5 mr-2" /> Edit
          </div>
        </div>
      )}
      {position === 'top' && setYear && (
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
      )}
    </div>
  )
}