import { jenisAccount } from '@constants/categories'
import { useAccount } from '@hooks/useAccount'
import { isSelectJenisOption } from '@utils/isSelectOptionValid'
import React from 'react'
import Select from 'react-select'
import { customStyles } from './index'

export const JenisAccountSelect: React.FC = () => {
  const {
    account: { category },
    dispatch,
  } = useAccount()

  const chosenCategory = jenisAccount.find((x) => x.label.toLowerCase() == category.toString().toLowerCase())

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
        value={chosenCategory}
        onChange={(v) => {
          if (isSelectJenisOption(v)) {
            dispatch({ type: 'set_jenis', jenis: v.value })
          }
        }}
      />
    </div>
  )
}
