import { useMutation, useQuery } from 'react-query'
import config from 'config'
import axios, { AxiosError } from 'axios'
import { Account } from '@context/AccountContext/types'
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from './endpoints'
import toast from 'react-hot-toast'
import { capitalize } from '@utils/capitalize'

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
  return useMutation(
    ({ accountId, account, year }: UpdateAccountPayload) =>
      updateAccount(accountId, account, year),
    {
      onError: (error) => {
        const error_ = error as AxiosError
        const errorMsg = error_.response?.data.error
        toast.error(`${capitalize(errorMsg)}.`)
      },
    }
  )
}

export const useDeleteAccount = () => {
  return useMutation(({ id, year }: DeleteAccountPayload) =>
    deleteAccount(id, year)
  )
}
