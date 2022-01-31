import { useAccount } from '@hooks/useAccount'
import React, { ChangeEvent } from 'react'

export const numberInput = () => {
  const {
    account: { number },
    dispatch,
  } = useAccount()

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Account Number <span className="text-error">*</span>
        </span>
      </label>
      <input
        type="text"
        placeholder="Enter Account Number"
        className="input input-bordered"
        value={number}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'set_account_no', accNo: e.target.value })}
      />
    </div>
  )
}
