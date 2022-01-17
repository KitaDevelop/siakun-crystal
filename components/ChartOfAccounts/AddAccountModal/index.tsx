import { useFetchAccounts } from '@api/accounts'
import { Modal } from '@components/Modal'
import { AccountCategory, EmptyAccount } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React, { ChangeEvent, useEffect } from 'react'
import { AdditionalInfo } from './AdditionalInfo'
import { AccountNameInput } from './Form/AccountNameInput'
import { AccountNumberInput } from './Form/AccountNumberInput'
import { DescriptionInput } from './Form/DescriptionInput'
import { JenisAccountSelect } from './Select/JenisAccountSelect'
import { ParentAccountSelect } from './Select/ParentAccountSelect'

interface Props {
  isBlank: boolean
  isOpen: boolean
  setIsOpen: Function
}

export const AddAccountModal = ({ isOpen, setIsOpen, isBlank }: Props) => {
  const {
    account: { accountNumber, name, description, category },
    dispatch,
  } = useAccount()

  useEffect(() => {
    if (isBlank) dispatch({ type: 'set_account', account: EmptyAccount })
  }, [])

  const onSaveAccount = () => {}

  return (
    <Modal
      {...{ isOpen, setIsOpen, isOverflow: category == AccountCategory.AKUN || category == AccountCategory.JUMLAH }}
    >
      <div className="font-bold text-xl mb-4">Create New Account</div>
      <form className="w-full flex flex-col gap-2">
        <ParentAccountSelect />
        <AccountNumberInput />
        <AccountNameInput />
        <DescriptionInput />
        <JenisAccountSelect />
        <AdditionalInfo />
      </form>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
          cancel
        </button>
        <button onClick={onSaveAccount} className="btn btn-primary">
          {isBlank ? 'create' : 'save'}
        </button>
      </div>
    </Modal>
  )
}
