import { useAccount } from '@hooks/useAccount'
import { isSelectAccountOption } from '@utils/isSelectOptionValid'
import React from 'react'
import Select from 'react-select'
import { customStyles } from './index'

export const ParentAccountSelect = () => {
  const {
    accounts,
    account: { parentNumber },
    dispatch,
  } = useAccount()

  const accountOptions = accounts.map((account) => ({
    value: account,
    label: `${account.number} | ${account.name}`,
  }))
  const chosenAccount = accountOptions.find((x) => x.value.number == parentNumber)

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Parent Account <span className="text-error">*</span>
        </span>
      </label>
      <Select
        options={accountOptions}
        value={chosenAccount}
        onChange={(v) => {
          if (isSelectAccountOption(v)) {
            dispatch({ type: 'set_parent_number', parentNumber: v.value.number })
          }
        }}
        placeholder="Select Parent Account"
        styles={customStyles}
        closeMenuOnSelect
        isSearchable
      />
    </div>
  )
}
