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
  accountNumber: string
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

export const useFetchAccount = (accountNumber: string, year?: number) => {
  return useQuery('accounts', () => getAccount(accountNumber, year))
}

export const useCreateAccount = () => {
  return useMutation((account: Account) => createAccount(account))
}

export const useUpdateAccount = () => {
  return useMutation(({ accountNumber, account, year }: UpdateAccountPayload) =>
    updateAccount(accountNumber, account, year)
  )
}

export const useDeleteAccount = () => {
  return useMutation(({ id, year }: DeleteAccountPayload) =>
    deleteAccount(id, year)
  )
}
