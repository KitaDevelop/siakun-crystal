import { Modal } from '@components/Modal'
import { AccountCategory } from '@constants/accounts'
import { useAccount } from '@hooks/useAccount'
import React, { useEffect } from 'react'
import { AdditionalInfo } from './AdditionalInfo'
import { AccountNameInput } from './Form/AccountNameInput'
import { AccountNumberInput } from './Form/AccountNumberInput'
import { DescriptionInput } from './Form/DescriptionInput'
import { JenisAccountSelect } from './Select/JenisAccountSelect'
import { ParentAccountSelect } from './Select/ParentAccountSelect'
import useAccountForm from '@hooks/useAccountForm'
import { Control, FieldErrorsImpl, UseFormSetValue, useWatch } from 'react-hook-form'

interface Props {
  account?: Account
  isBlank: boolean
  isOpen: boolean
  setIsOpen: Function
}

export interface AccountInputProps {
  control: Control<Account, any>
  errors: FieldErrorsImpl<Account>
  setValue?: UseFormSetValue<Account>
}

export const AddAccountModal = ({ isOpen, setIsOpen, isBlank, account }: Props) => {
  const { control, errors, handleSubmit, setValue, createAccount, updateAccount, reset } =
    useAccountForm(account)
  const category = useWatch({ name: 'category', control })

  useEffect(() => {
    if (isOpen && isBlank) reset()
  }, [isOpen, isBlank])

  const onSaveAccount = (data: Account) => {
    if (isBlank) createAccount(data)
    else updateAccount(data)
  }

  return (
    <Modal
      {...{
        isOpen,
        setIsOpen,
        isOverflow: category == AccountCategory.AKUN || category == AccountCategory.JUMLAH,
      }}
    >
      <div className="font-bold text-xl mb-4">{isBlank ? 'Create New' : 'Edit'} Account</div>
      <form onSubmit={handleSubmit(onSaveAccount)} className="w-full flex flex-col gap-2">
        <ParentAccountSelect {...{ control, errors, setValue }} />
        <AccountNumberInput {...{ control, errors }} />
        <AccountNameInput {...{ control, errors }} />
        <DescriptionInput {...{ control, errors }} />
        <JenisAccountSelect {...{ control, errors, setValue }} />
        <AdditionalInfo {...{ control, errors, setValue }} />
        <div className="modal-action">
          <button className="btn btn-ghost" type="button" onClick={() => setIsOpen(false)}>
            cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isBlank ? 'create' : 'save'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
