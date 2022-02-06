import { useJournalEntry } from '@hooks/useJournalEntry'
import { dataURLtoFile } from '@utils/dataUrlToFile'
import React, { useEffect, useState } from 'react'
import { ReceiptDropzone } from './ReceiptDropzone'

interface Props {
  isBlank: boolean
  isOpen: boolean
}

const ReceiptInput = ({ isOpen, isBlank }: Props) => {
  const [dropzoneKey, setDropzoneKey] = useState<number>(0)

  useEffect(() => {
    setDropzoneKey(Date.now())
  }, [isOpen])

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Receipt</span>
      </label>
      <ReceiptDropzone key={dropzoneKey} {...{ isBlank }} />
    </div>
  )
}

export default ReceiptInput
