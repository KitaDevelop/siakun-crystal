import { useMutation, useQuery } from 'react-query'
import { Account } from '@context/AccountContext/types'
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from './endpoints'
import { DeletePayload, handleError, OPTIONS } from '..'

export interface UpdateAccountPayload {
  accountId: number
  account: Partial<Account>
  year?: number
}

export const useFetchAccounts = (year?: number) => {
  return useQuery('accounts', () => getAccounts(year), OPTIONS)
}

export const useFetchAccount = (number: string, year?: number) => {
  return useQuery('accounts', () => getAccount(number, year), OPTIONS)
}

export const useCreateAccount = () => {
  return useMutation((account: Account) => createAccount(account), {
    onError: handleError,
  })
}

export const useUpdateAccount = () => {
  return useMutation(
    ({ accountId, account, year }: UpdateAccountPayload) =>
      updateAccount(accountId, account, year),
    { onError: handleError }
  )
}

export const useDeleteAccount = () => {
  return useMutation(({ id, year }: DeletePayload) => deleteAccount(id, year), {
    onError: handleError,
  })
}
