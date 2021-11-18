import { useAccount } from '@context/AccountContext'
import React from 'react'
import Select from 'react-select'
import { dummyAccounts, customStyles } from './index'

export const ParentAccountSelect: React.FC = () => {
  const { dispatch } = useAccount()
  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Parent Account <span className="text-error">*</span>
        </span>
      </label>
      <Select
        options={dummyAccounts}
        placeholder="Select Parent Account"
        styles={customStyles}
        closeMenuOnSelect
        isSearchable
      />
    </div>
  )
}
