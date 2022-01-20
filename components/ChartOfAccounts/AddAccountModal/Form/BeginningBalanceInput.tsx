import { useAccount } from '@hooks/useAccount'
import React, { ChangeEvent } from 'react'

export const BeginningBalanceInput = () => {
  const {
    account: { beginningBalance },
    dispatch,
  } = useAccount()

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Beginning Balance <span className="text-error"></span>
        </span>
      </label>
      <div className="relative">
        <div className="absolute top-0 left-0 btn btn-ghost hover:bg-transparent rounded-r-none normal-case">Rp</div>
        <input
          type="number"
          placeholder="Enter Beginning Balance"
          className="input input-bordered pl-12 w-full"
          value={beginningBalance}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: 'set_beginning_balance', beginningBalance: Number(e.target.value) })
          }
        />
      </div>
    </div>
  )
}
