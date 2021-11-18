import { useAccount } from '@context/AccountContext'
import React from 'react'
import Select from 'react-select'
import { customStyles, jenisAccount } from './index'

export const JenisAccountSelect: React.FC = () => {
  const { dispatch } = useAccount()

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
      />
    </div>
  )
}
