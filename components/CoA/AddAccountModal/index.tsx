import { Modal } from '@components/Modal'
import React from 'react'
import { JenisAccountSelect, ParentAccountSelect } from './Select'

interface Props {
  isOpen: boolean
  setIsOpen: Function
}

export const AddAccountModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Modal {...{ isOpen, setIsOpen }}>
      <div className="font-bold text-xl mb-4">Create New Account</div>
      <form className="w-full flex flex-col gap-2">
        <ParentAccountSelect />
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">
              Account No. <span className="text-error">*</span>
            </span>
          </label>
          <input type="text" placeholder="Enter Account Number" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">
              Account Name <span className="text-error">*</span>
            </span>
          </label>
          <input type="text" placeholder="Enter Account Name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">
              Description <span className="text-error">*</span>
            </span>
          </label>
          <textarea className="textarea textarea-bordered resize-none" placeholder="Enter Description"></textarea>
        </div>
        <JenisAccountSelect />
      </form>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
          cancel
        </button>
        <button className="btn btn-primary">create</button>
      </div>
    </Modal>
  )
}
