import { useMutation, useQuery } from 'react-query'
import { Account } from '@context/AccountContext/types'
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from './endpoints'
import { DeletePayload, handleError } from '..'

export interface UpdateAccountPayload {
  accountId: number
  account: Partial<Account>
  year?: number
}

export const useFetchAccounts = (year?: number) => {
  return useQuery('accounts', () => getAccounts(year), {
    staleTime: 3600 * 1000,
    cacheTime: 3600 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export const useFetchAccount = (number: string, year?: number) => {
  return useQuery('accounts', () => getAccount(number, year))
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
