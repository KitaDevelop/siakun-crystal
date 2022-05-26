import { Account } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import { isSelectAccountOption } from '@utils/isSelectOptionValid'
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

  const filteredOptions = (): AccountSelectOptions[] => {
    return accounts
      .filter((a) => a.number === subAccounts?.[idx] || !(subAccounts as string[]).includes(a.number))
      .map((account) => ({
        value: account,
        label: `${account.number} | ${account.name}`,
      }))
  }

  const [options, setOptions] = useState<AccountSelectOptions[]>(filteredOptions())
  const [chosen, setChosen] = useState<AccountSelectOptions | undefined>(
    options.find((x) => x.value.number == subAccounts?.[idx])
  )

  useEffect(() => {
    const accountOptions = filteredOptions()
    setOptions(accountOptions)
  }, [accounts, subAccounts, chosen])

  const onSubAccountSelect = (val: SingleValue<AccountSelectOptions>) => {
    if (isSelectAccountOption(val)) {
      setChosen(val)
      const accounts_ = [...(subAccounts || [])]
      accounts_.splice(idx, 1, val?.value?.number)
      dispatch({ type: 'set_sub_accounts', subAccounts: accounts_ })
    }
  }

  const onDeleteSubAccount = () => {
    const accounts_ = [...(subAccounts || [])]
    accounts_.splice(idx, 1)
    dispatch({ type: 'set_sub_accounts', subAccounts: accounts_ })
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
        value={chosen}
        onChange={(val) => onSubAccountSelect(val)}
      />
      <div onClick={onDeleteSubAccount} className="btn btn-circle btn-secondary btn-outline btn-sm">
        <IoTrashOutline className="w-5 h-5" />
      </div>
    </div>
  )
}
