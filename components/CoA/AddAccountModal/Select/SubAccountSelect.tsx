import { useAccount } from '@context/AccountContext/AccountProvider'
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import Select from 'react-select'
import { customStyles, dummyAccounts } from './index'

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
