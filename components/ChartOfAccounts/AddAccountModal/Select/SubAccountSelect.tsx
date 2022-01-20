import { Account } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React, { useEffect, useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import Select, { SingleValue } from 'react-select'
import { customStyles } from './index'

interface Props {
  idx: number
}

interface AccountSelectOptions {
  value: Account
  label: string
}

export const SubAccountSelect = ({ idx }: Props) => {
  const {
    accounts,
    account: { subAccounts },
    dispatch,
  } = useAccount()

  const [options, setOptions] = useState<AccountSelectOptions[] | undefined>()

  useEffect(() => {
    const accountOptions = accounts
      .filter((a) => !(subAccounts as Account[]).includes(a))
      .map((account) => ({
        value: account,
        label: `${account.accountNumber} | ${account.name}`,
      }))
    setOptions(accountOptions)
  }, [accounts, subAccounts])

  const onSubAccountSelect = (val: SingleValue<AccountSelectOptions>) => {
    const accounts = (subAccounts || []).splice(idx, 1, val?.value as Account)
    dispatch({ type: 'set_sub_accounts', subAccounts: accounts })
  }

  const onDeleteSubAccount = () => {
    const accounts = (subAccounts || []).splice(idx, 1)
    dispatch({ type: 'set_sub_accounts', subAccounts: accounts })
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
        onChange={(val) => onSubAccountSelect(val)}
      />
      <div onClick={onDeleteSubAccount} className="btn btn-circle btn-secondary btn-outline btn-sm">
        <IoTrashOutline className="w-5 h-5" />
      </div>
    </div>
  )
}
