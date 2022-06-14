import { useMutation, useQuery } from 'react-query'
import { Account } from '@context/AccountContext/types'
import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
} from './endpoints'
import { handleError, OPTIONS } from '..'

export interface AccountResponse {
  isLocked: boolean
  data: Account[]
}

export interface SingleAccountResponse {
  data: Account
}

export interface UpdateAccountPayload {
  accountNumber: string
  account: Partial<Account>
  year?: number
}

export interface DeleteAccountPayload {
  accountNumber: string
  year?: number
}

export const useFetchAccounts = (year?: number, oID?: number) => {
  return useQuery(
    `accounts-${year}-${oID}`,
    () => getAccounts(year, oID),
    OPTIONS
  )
}

export const useFetchAccount = (number: string, year?: number) => {
  return useQuery(`accounts-${year}`, () => getAccount(number, year), OPTIONS)
}

export const useCreateAccount = () => {
  return useMutation((account: Account) => createAccount(account), {
    onError: handleError,
  })
}

export const useUpdateAccount = () => {
  return useMutation(
    ({ accountNumber, account, year }: UpdateAccountPayload) =>
      updateAccount(accountNumber, account, year),
    { onError: handleError }
  )
}

export const useDeleteAccount = () => {
  return useMutation(
    ({ accountNumber, year }: DeleteAccountPayload) =>
      deleteAccount(accountNumber, year),
    {
      onError: handleError,
    }
  )
}
