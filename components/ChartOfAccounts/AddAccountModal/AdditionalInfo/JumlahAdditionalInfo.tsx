import { useAccount } from '@hooks/useAccount'
import React, { useEffect } from 'react'
import { IoAdd } from 'react-icons/io5'
import { SubAccountSelect } from '../Select/SubAccountSelect'

export const JumlahAdditionalInfo = () => {
  const {
    account: { subAccounts },
    dispatch,
  } = useAccount()

  useEffect(() => {
    if (!subAccounts) dispatch({ type: 'set_sub_accounts', subAccounts: [] })
  }, [])

  const addSubAccountHandler = () => {
    const accounts = [...(subAccounts || []), '']
    dispatch({ type: 'set_sub_accounts', subAccounts: accounts })
  }

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Sub-Accounts</span>
      </label>
      <div className="flex flex-col gap-2">
        {subAccounts && subAccounts.map((accNumber, idx) => <SubAccountSelect key={accNumber} idx={idx} />)}
      </div>
      <div onClick={addSubAccountHandler} className="btn btn-ghost text-primary self-start btn-sm">
        <IoAdd className="mr-2" /> Add More
      </div>
    </div>
  )
}
