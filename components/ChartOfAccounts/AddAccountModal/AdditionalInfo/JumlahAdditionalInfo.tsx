import { SubAccount } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React, { useEffect } from 'react'
import { IoAdd } from 'react-icons/io5'
import { SubAccountSelect } from '../Select/SubAccountSelect'

export const JumlahAdditionalInfo: React.FC = () => {
  const {
    state: { subAccounts },
    dispatch,
  } = useAccount()

  useEffect(() => {
    if (!subAccounts) dispatch({ type: 'set_sub_accounts', subAccounts: [EmptySubAccount] })
  }, [])

  const addSubAccountHandler = () => {
    const newAccount = { ...EmptySubAccount }
    const accounts = [...(subAccounts || [])]
    accounts.push(newAccount as SubAccount)
    dispatch({ type: 'set_sub_accounts', subAccounts: accounts })
  }

  const EmptySubAccount = { id: -1, accountNumber: '', name: '' }

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Sub-Accounts</span>
      </label>
      <div className="flex flex-col gap-2">
        {subAccounts && subAccounts.map((_, i) => <SubAccountSelect key={i} />)}
      </div>
      <div onClick={addSubAccountHandler} className="btn btn-ghost text-primary self-start btn-sm">
        <IoAdd className="mr-2" /> Add More
      </div>
    </div>
  )
}
