import { AccountType } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React from 'react'

export const AccountTypeRadio = () => {
  const {
    account: { type },
    dispatch,
  } = useAccount()

  const onAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    dispatch({ type: 'set_account_type', accType: value as AccountType })
  }

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Account Type <span className="text-error">*</span>
        </span>
      </label>
      <div className="grid grid-cols-3 ml-2">
        <label htmlFor="at-neraca" className="flex gap-2 items-center">
          <input
            onChange={onAccountTypeChange}
            id="at-neraca"
            type="radio"
            name="account-type"
            className="radio radio-secondary"
            checked={type == AccountType.NERACA}
            value={AccountType.NERACA}
          />
          <span className="label-text">Neraca</span>
        </label>
        <label htmlFor="at-labarugi" className="flex gap-2 items-center">
          <input
            onChange={onAccountTypeChange}
            id="at-labarugi"
            type="radio"
            name="account-type"
            className="radio radio-secondary"
            checked={type == AccountType.LABARUGI}
            value={AccountType.LABARUGI}
          />
          <span className="label-text">Labarugi</span>
        </label>
      </div>
    </div>
  )
}
