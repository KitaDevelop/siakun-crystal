import { AccountType, NormalBalance } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React from 'react'

export const AccountAdditionalInfo: React.FC = () => {
  const { dispatch } = useAccount()
  const onNormalBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    dispatch({ type: 'set_normal_balance', normalBalance: value as NormalBalance })
  }
  const onAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    dispatch({ type: 'set_account_type', accType: value as AccountType })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="form-control">
        <label className="label font-bold">
          <span className="label-text">
            Normal Balance <span className="text-error">*</span>
          </span>
        </label>
        <div className="grid grid-cols-3 ml-2">
          <label htmlFor="nb-debit" className="flex gap-2 items-center">
            <input
              onChange={onNormalBalanceChange}
              id="nb-debit"
              type="radio"
              name="normal-balance"
              className="radio radio-secondary"
              value={NormalBalance.DEBIT}
            ></input>
            <span className="label-text">Debit</span>
          </label>
          <label htmlFor="nb-credit" className="flex gap-2 items-center">
            <input
              onChange={onNormalBalanceChange}
              id="nb-credit"
              type="radio"
              name="normal-balance"
              className="radio radio-secondary"
              value={NormalBalance.CREDIT}
            ></input>
            <span className="label-text">Credit</span>
          </label>
        </div>
      </div>
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
              value={AccountType.NERACA}
            ></input>
            <span className="label-text">Neraca</span>
          </label>
          <label htmlFor="at-labarugi" className="flex gap-2 items-center">
            <input
              onChange={onAccountTypeChange}
              id="at-labarugi"
              type="radio"
              name="account-type"
              className="radio radio-secondary"
              value={AccountType.LABARUGI}
            ></input>
            <span className="label-text">Labarugi</span>
          </label>
        </div>
      </div>
    </div>
  )
}
