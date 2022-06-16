import { useAccount } from '@hooks/useAccount'
import { isSelectAccountOption } from '@utils/isSelectOptionValid'
import React from 'react'
import Select from 'react-select'
import { customStyles } from './index'

export const ParentAccountSelect = () => {
  const {
    accounts,
    dispatch,
  } = useAccount()

  const accountOptions = accounts.map((account) => ({
    value: account,
    label: `${account.number} | ${account.name}`,
  }))

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Parent Account <span className="text-error">*</span>
        </span>
      </label>
      <Select
        options={accountOptions}
        onChange={(v) => {
          if (isSelectAccountOption(v)) {
            dispatch({ type: 'set_parent_number', parentNumber: v.value.number, parent: v.value })
          }
        }}
        placeholder="Select Parent Account"
        styles={customStyles}
        closeMenuOnSelect
        isSearchable
        isClearable
        className="flex-1"
      />
    </div>
  )
}
