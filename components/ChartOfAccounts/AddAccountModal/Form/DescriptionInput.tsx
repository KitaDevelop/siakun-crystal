import { useAccount } from '@hooks/useAccount'
import React, { ChangeEvent } from 'react'

export const DescriptionInput = () => {
  const {
    account: { description },
    dispatch,
  } = useAccount()

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Description <span className="text-error">*</span>
        </span>
      </label>
      <textarea
        className="textarea textarea-bordered resize-none"
        placeholder="Enter Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: 'set_desc', desc: e.target.value })}
      ></textarea>
    </div>
  )
}
