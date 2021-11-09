import { JenisAccount, useAccount } from '@context/AccountContext'
import React from 'react'
import Select from 'react-select'

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
        onChange={(e) => dispatch({ type: 'set_parent_acc', parent: e.value })}
        closeMenuOnSelect
        isSearchable
      />
    </div>
  )
}

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
        onChange={(e) => dispatch({ type: 'set_jenis', jenis: e.value })}
        closeMenuOnSelect
        isSearchable
      />
    </div>
  )
}

const customStyles = {
  placeholder: (styles) => ({ ...styles, lineHeight: 2, fontSize: '0.875rem' }),
  control: (styles) => ({ ...styles, borderRadius: 8 }),
}

const jenisAccount = [
  { value: JenisAccount.HEADING, label: 'Heading' },
  { value: JenisAccount.AKUN, label: 'Akun' },
  { value: JenisAccount.JUMLAH, label: 'Jumlah' },
]

const dummyAccounts = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]
