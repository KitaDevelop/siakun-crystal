import { useAdjustingEntry } from '@hooks/useAdjustingEntry'
import React, { ChangeEvent } from 'react'

type Props = {}

const DescriptionTextarea = (props: Props) => {
  const {
    state: { description },
    dispatch,
  } = useAdjustingEntry()
  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Description</span>
      </label>
      <textarea
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: 'set_desc', description: e.target.value })}
        className="textarea textarea-bordered resize-none"
        placeholder="Enter Description"
      ></textarea>
    </div>
  )
}

export default DescriptionTextarea
