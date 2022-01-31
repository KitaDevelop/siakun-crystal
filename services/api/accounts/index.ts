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

export interface UpdateAccountPayload {
  accountId: number
  account: Partial<Account>
  year?: number
}

export interface DeleteAccountPayload {
  id: number
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
  return useMutation((account: Account) => createAccount(account))
}

export const useUpdateAccount = () => {
  return useMutation(({ accountId, account, year }: UpdateAccountPayload) =>
    updateAccount(accountId, account, year)
  )
}

export const useDeleteAccount = () => {
  return useMutation(({ id, year }: DeleteAccountPayload) =>
    deleteAccount(id, year)
  )
}
