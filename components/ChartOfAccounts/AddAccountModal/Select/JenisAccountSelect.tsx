import { AccountCategory } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React from 'react'
import Select from 'react-select'
import { customStyles, jenisAccount } from './index'

type SelectJenisOption = {
  label: string
  value: AccountCategory
}

export const JenisAccountSelect: React.FC = () => {
  const { dispatch } = useAccount()

  const isSelectJenisOption = (v: any): v is SelectJenisOption => {
    if ((v as SelectJenisOption).value !== undefined) return v.value
    return false
  }

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Jenis <span className="text-error">*</span>
        </span>
      </label>
      <Select
        options={jenisAccount}
        placeholder="Select Jenis Account"
        styles={customStyles}
        closeMenuOnSelect
        isSearchable
        onChange={(v) => {
          if (isSelectJenisOption(v)) {
            dispatch({ type: 'set_jenis', jenis: v.value })
          }
        }}
      />
    </div>
  )
}
