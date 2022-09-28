import { useAccount } from '@hooks/useAccount'
import React, { useEffect } from 'react'
import { IoAdd } from 'react-icons/io5'
import { AccountInputProps } from '..'
import { SubAccountSelect } from '../Select/SubAccountSelect'
import { useWatch } from 'react-hook-form'

export const JumlahAdditionalInfo = ({ control, errors, setValue }: AccountInputProps) => {
  const subAccounts = useWatch({ name: 'subAccounts', control })
  console.log(
    '🚀 ~ file: JumlahAdditionalInfo.tsx ~ line 10 ~ JumlahAdditionalInfo ~ subAccounts',
    subAccounts
  )

  // useEffect(() => {
  //   if (!subAccounts) dispatch({ type: 'set_sub_accounts', subAccounts: [] })
  // }, [])

  const addSubAccountHandler = () => {
    const accounts = [...(subAccounts || []), '']
    setValue && setValue('subAccounts', accounts)
  }

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Sub-Accounts</span>
      </label>
      <div className="flex flex-col gap-2">
        {subAccounts &&
          subAccounts.map((_, idx) => (
            <SubAccountSelect key={idx} idx={idx} {...{ control, errors, setValue }} />
          ))}
      </div>
      <div onClick={addSubAccountHandler} className="btn btn-ghost text-primary self-start btn-sm">
        <IoAdd className="mr-2" /> Add More
      </div>
    </div>
  )
}
