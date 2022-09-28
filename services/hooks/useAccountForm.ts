import { useCreateAccount, useUpdateAccount } from '@api/accounts'
import {
  AccountCategory,
  AccountType,
  NormalBalance,
} from '@constants/accounts'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAccount } from './useAccount'
import { useYear } from './useYear'

const useAccountForm = (account?: Account) => {
  const setDefaultValues = (): Account => {
    return {
      id: account?.id ?? -1,
      name: account?.name ?? '',
      number: account?.number ?? '',
      description: account?.description ?? '',
      category: account?.category ?? AccountCategory.NONE,
      type: account?.type ?? AccountType.NERACA,
      normalBalance: account?.normalBalance ?? NormalBalance.CREDIT,
      beginningBalance: account?.beginningBalance ?? 0,
      parentNumber: account?.parentNumber ?? '',
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: setDefaultValues(),
  })
  const { accounts, dispatch } = useAccount()
  const { year } = useYear()

  const createAccountMutation = useCreateAccount()
  const updateAccountMutation = useUpdateAccount()

  useEffect(() => {
    if (account) {
      setValue('id', account?.id ?? -1)
      setValue('name', account?.name ?? '')
      setValue('number', account?.number ?? '')
      setValue('description', account?.description ?? '')
      setValue('category', account?.category ?? AccountCategory.NONE)
      setValue('type', account?.type ?? AccountType.NERACA)
      setValue('normalBalance', account?.normalBalance ?? NormalBalance.DEBIT)
      setValue('beginningBalance', account?.beginningBalance ?? 0)
      setValue('parentNumber', account?.parentNumber ?? '')
      setValue('subAccounts', account?.subAccounts ?? [])
    }
  }, [account])

  const cleanData = (data: Account) => {
    if (data.category === AccountCategory.AKUN)
      return {
        ...data,
        beginningBalance: Number(data.beginningBalance),
      }
    return data
  }

  const createAccount = (data: Account) => {
    createAccountMutation.mutate(cleanData(data), {
      onSuccess: () => {
        const accounts_ = [...accounts, data]
        dispatch({ type: 'set_accounts', payload: accounts_ })
        dispatch({ type: 'set_is_modal_open', to: false })
        toast.success('Successfully created a new account.')
      },
    })
  }

  const updateAccount = (data: Account) => {
    updateAccountMutation.mutate(
      { accountNumber: data.number, account: cleanData(data), year: year },
      {
        onSuccess: () => {
          const accounts_ = [...accounts]
          const index = accounts_.findIndex((x) => x.id === data.id)
          accounts_[index] = data
          dispatch({ type: 'set_accounts', payload: accounts_ })
          dispatch({ type: 'set_is_modal_open', to: false })
          toast.success(`Account "${data.name}" updated.`)
        },
      }
    )
  }

  return {
    control,
    handleSubmit,
    setValue,
    updateAccount,
    createAccount,
    reset,
    errors,
  }
}

export default useAccountForm
