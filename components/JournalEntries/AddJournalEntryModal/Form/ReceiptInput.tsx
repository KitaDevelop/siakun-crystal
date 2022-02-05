import React from 'react'
import { ReceiptDropzone } from './ReceiptDropzone'

const ReceiptInput = () => {
  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Receipts</span>
      </label>
      <ReceiptDropzone />
    </div>
  )
}

export default ReceiptInput
