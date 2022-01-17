import { Account } from '@context/AccountContext/types'
import axios from 'axios'
import config from 'config'

export const getAccounts = (year?: number) =>
  axios.get<Account[]>(
    `${config.API_URL_CARBON}/accounts${!!year ? `?year=${year}` : ''}`
  )

export const getAccount = (accountId: number) =>
  axios.get<Account>(`${config.API_URL_CARBON}/accounts/${accountId}`)

export const createAccount = (account: Account) =>
  axios.post<Account>(`${config.API_URL_CARBON}/accounts`, account)

export const updateAccount = (
  accountId: number,
  account: Partial<Account>,
  year?: number
) =>
  axios.put<Account>(
    `${config.API_URL_CARBON}/accounts/${accountId}${
      !!year ? `?year=${year}` : ''
    }`,
    account
  )

export const deleteAccount = (accountId: number, year?: number) =>
  axios.delete(
    `${config.API_URL_CARBON}/accounts/${accountId}${
      !!year ? `?year=${year}` : ''
    }`
  )
