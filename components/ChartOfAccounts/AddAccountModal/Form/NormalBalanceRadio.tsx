import { NormalBalance } from '@constants/accounts'
import { useAccount } from '@hooks/useAccount'
import React from 'react'

export const NormalBalanceRadio = () => {
  const {
    account: { normalBalance },
    dispatch,
  } = useAccount()
  const onNormalBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    dispatch({ type: 'set_normal_balance', normalBalance: value as NormalBalance })
  }

  return (
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
            checked={normalBalance == NormalBalance.DEBIT}
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
            checked={normalBalance == NormalBalance.CREDIT}
            value={NormalBalance.CREDIT}
          ></input>
          <span className="label-text">Credit</span>
        </label>
      </div>
    </div>
  )
}
