import { useMutation, useQuery } from 'react-query'
import config from 'config'
import axios from 'axios'
import { Account } from '@context/AccountContext/types'
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from './endpoints'

export const useFetchAccounts = (year?: number) => {
  return useQuery('accounts', () => getAccounts(), {
    staleTime: 3600 * 1000,
    cacheTime: 3600 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}

export const useFetchAccount = (accountId: number) => {
  return useQuery('accounts', () => getAccount(accountId))
}

export const useCreateAccount = (account: Account) => {
  return useMutation(() => createAccount(account))
}

export const useUpdateAccount = (
  accountId: number,
  account: Partial<Account>
) => {
  return useMutation(() => updateAccount(accountId, account))
}

export const useDeleteAccount = (accountId: number) => {
  return useMutation(() => deleteAccount(accountId))
}
