import { useJournalEntry } from '@hooks/useJournalEntry'
import { dataURLtoFile } from '@utils/dataUrlToFile'
import React from 'react'
import { ReceiptDropzone } from './ReceiptDropzone'

const ReceiptInput = () => {
  const {
    state: { receipt },
  } = useJournalEntry()

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Receipt</span>
      </label>
      <ReceiptDropzone initialFiles={receipt == '' ? [] : [dataURLtoFile(receipt as string, 'receipt')]} />
    </div>
  )
}

export default ReceiptInput
