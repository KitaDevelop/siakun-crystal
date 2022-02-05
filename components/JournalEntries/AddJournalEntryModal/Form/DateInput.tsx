import { useJournalEntry } from '@hooks/useJournalEntry'
import React, { ChangeEvent } from 'react'

const DateInput = () => {
  const {
    state: { date },
    dispatch,
  } = useJournalEntry()

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Date <span className="text-error">*</span>
        </span>
      </label>
      <input
        type="date"
        className="input input-bordered"
        value={date}
        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'set_date', date: e.target.value })}
      />
    </div>
  )
}

export default DateInput
