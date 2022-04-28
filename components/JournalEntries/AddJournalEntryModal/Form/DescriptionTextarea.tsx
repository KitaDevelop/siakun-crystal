import { useJournalEntry } from '@hooks/useJournalEntry'
import React, { ChangeEvent } from 'react'

const DescriptionTextarea = () => {
  const {
    state: { description },
    dispatch,
  } = useJournalEntry()
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
