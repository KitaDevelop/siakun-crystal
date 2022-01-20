import { useCreateAccount, useFetchAccounts } from '@api/accounts'
import { Modal } from '@components/Modal'
import { AccountCategory, EmptyAccount } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React, { ChangeEvent, useEffect } from 'react'
import toast from 'react-hot-toast'
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
  const { account, dispatch } = useAccount()
  const createAccount = useCreateAccount()

  useEffect(() => {
    if (isBlank) dispatch({ type: 'set_account', account: EmptyAccount })
  }, [])

  const onSaveAccount = () => {
    const { accounts, parentAccount, subAccounts, ...account_ } = account
    console.log(account_)
    createAccount.mutate(account_, {
      onSuccess: () => {
        const accounts_ = [...accounts, account_]
        setIsOpen(false)
        dispatch({ type: 'set_accounts', payload: accounts_ })
        toast.success('Successfully created a new account.')
      },
      onError: () => {
        toast.error('Oops, something wrong happened.')
      },
    })
  }

  return (
    <Modal
      {...{
        isOpen,
        setIsOpen,
        isOverflow: account.category == AccountCategory.AKUN || account.category == AccountCategory.JUMLAH,
      }}
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
        <button onClick={() => onSaveAccount()} className="btn btn-primary">
          {isBlank ? 'create' : 'save'}
        </button>
      </div>
    </Modal>
  )
}
