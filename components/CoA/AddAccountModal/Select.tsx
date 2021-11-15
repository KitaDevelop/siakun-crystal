import { JenisAccount, useAccount } from '@context/AccountContext'
import React from 'react'
import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select'
import { IoTrashOutline } from 'react-icons/io5'

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

export const SubAccountSelect: React.FC = () => {
  const { dispatch } = useAccount()

  return (
    <div className="flex gap-2 items-center">
      <Select
        className="flex-1"
        options={dummyAccounts}
        placeholder="Select Jenis Account"
        styles={customStyles}
        closeMenuOnSelect
        isSearchable
      />
      <div className="btn btn-circle btn-secondary btn-outline btn-sm">
        <IoTrashOutline className="w-5 h-5" />
      </div>
    </div>
  )
}

const customStyles = {
  placeholder: (styles: CSSObjectWithLabel) => ({ ...styles, lineHeight: 2, fontSize: '0.875rem' }),
  control: (styles: CSSObjectWithLabel) => ({ ...styles, borderRadius: 8 }),
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
