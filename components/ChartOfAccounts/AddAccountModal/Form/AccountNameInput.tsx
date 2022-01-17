import { useAccount } from '@hooks/useAccount'
import React, { ChangeEvent } from 'react'

export const AccountNameInput = () => {
  const {
    account: { name },
    dispatch,
  } = useAccount()

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Account Name <span className="text-error">*</span>
        </span>
      </label>
      <input
        type="text"
        placeholder="Enter Account Name"
        className="input input-bordered"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'set_account_name', accName: e.target.value })}
      />
    </div>
  )
}
