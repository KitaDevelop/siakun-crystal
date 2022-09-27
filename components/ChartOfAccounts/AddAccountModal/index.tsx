import { useCreateAccount, useUpdateAccount } from '@api/accounts'
import { Modal } from '@components/Modal'
import { AccountCategory, EmptyAccount } from '@constants/accounts'
import { useAccount } from '@hooks/useAccount'
import { useYear } from '@hooks/useYear'
import React, { useEffect } from 'react'
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
  const { accounts, account, dispatch } = useAccount()
  const { year } = useYear()
  const createAccount = useCreateAccount()
  const updateAccount = useUpdateAccount()

  useEffect(() => {
    if (isBlank) dispatch({ type: 'set_account', account: { ...EmptyAccount, parent: undefined } })
  }, [isOpen, isBlank])

  const onSaveAccount = () => {
    if (isBlank)
      createAccount.mutate(account, {
        onSuccess: () => {
          const accounts_ = [...accounts, account]
          setIsOpen(false)
          dispatch({ type: 'set_accounts', payload: accounts_ })
          toast.success('Successfully created a new account.')
        },
      })
    else {
      updateAccount.mutate(
        { accountNumber: account.number, account: account, year: year },
        {
          onSuccess: () => {
            const accounts_ = [...accounts]
            const index = accounts_.findIndex((x) => x.id === account.id)
            accounts_[index] = account
            dispatch({ type: 'set_accounts', payload: accounts_ })
            toast.success(`Account "${account.name}" updated.`)
            setIsOpen(false)
          },
        }
      )
    }
  }

  return (
    <Modal
      {...{
        isOpen,
        setIsOpen,
        isOverflow: account.category == AccountCategory.AKUN || account.category == AccountCategory.JUMLAH,
      }}
    >
      <div className="font-bold text-xl mb-4">{isBlank ? 'Create New' : 'Edit'} Account</div>
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
