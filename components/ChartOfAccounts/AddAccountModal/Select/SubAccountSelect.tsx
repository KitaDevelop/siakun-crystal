import { customStyles } from '@components/Form'
import { useAccount } from '@hooks/useAccount'
import { isSelectAccountOption } from '@utils/isSelectOptionValid'
import React, { useEffect, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { IoTrashOutline } from 'react-icons/io5'
import Select, { SingleValue } from 'react-select'
import { AccountInputProps } from '..'

interface Props extends AccountInputProps {
  idx: number
}

export const SubAccountSelect = ({ idx, control, setValue }: Props) => {
  const { accounts } = useAccount()
  const subAccounts = useWatch({ name: 'subAccounts', control })

  const filteredOptions = (): AccountSelectOptions[] => {
    return accounts
      .filter((a) => a.number === subAccounts?.[idx] || !subAccounts?.includes(a.number))
      .map((account) => ({
        value: account.number,
        label: `${account.number} | ${account.name}`,
      }))
  }

  const [options, setOptions] = useState<AccountSelectOptions[]>(filteredOptions())

  useEffect(() => {
    const accountOptions = filteredOptions()
    setOptions(accountOptions)
  }, [accounts, subAccounts])

  const onSubAccountSelect = (val: SingleValue<AccountSelectOptions>) => {
    if (isSelectAccountOption(val)) {
      const accounts_ = [...(subAccounts || [])]
      accounts_.splice(idx, 1, val?.value)
      setValue && setValue('subAccounts', accounts_)
    }
  }

  const onDeleteSubAccount = () => {
    const accounts_ = [...(subAccounts || [])]
    accounts_.splice(idx, 1)
    setValue && setValue('subAccounts', accounts_)
  }

  return (
    <div className="flex gap-2 items-center">
      <Select
        className="flex-1"
        options={options}
        placeholder="Select Sub Account"
        styles={customStyles}
        closeMenuOnSelect
        isSearchable
        value={options.find((x) => x.value == subAccounts?.[idx])}
        onChange={(val) => onSubAccountSelect(val)}
      />
      <div onClick={onDeleteSubAccount} className="btn btn-circle btn-secondary btn-outline btn-sm">
        <IoTrashOutline className="w-5 h-5" />
      </div>
    </div>
  )
}
