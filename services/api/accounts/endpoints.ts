import { Account } from '@context/AccountContext/types'
import axios from 'axios'
import config from 'config'
import { AccountResponse, SingleAccountResponse } from '.'

export const getAccounts = (year?: number) =>
  axios.get<AccountResponse>(
    `${config.API_URL_CARBON}/accounts${!!year ? '?year=' + year : ''}`
  )

export const getAccount = (accountId: string, year?: number) =>
  axios.get<SingleAccountResponse>(
    `${config.API_URL_CARBON}/accounts/${accountId}${
      !!year ? '?year=' + year : ''
    }`
  )

export const createAccount = (account: Account) => {
  const { id, subAccounts, parentNumber, ...acc_ } = account
  const account_ = {
    ...acc_,
    parentNumber: parentNumber !== '' ? parentNumber : undefined,
    subAccountsNumber: subAccounts?.filter((x) => x !== ''),
  }
  return axios.post<Account>(`${config.API_URL_CARBON}/accounts`, account_)
}

export const updateAccount = (
  accountNumber: string,
  account: Partial<Account>,
  year?: number
) => {
  const { id, subAccounts, ...acc_ } = account
  const account_ = {
    ...acc_,
    subAccountsNumber: subAccounts?.filter((x) => x !== ''),
  }
  return axios.put<Account>(
    `${config.API_URL_CARBON}/accounts/${accountNumber}${
      !!year ? '?year=' + year : ''
    }`,
    account_
  )
}

export const deleteAccount = (accountNumber: string, year?: number) =>
  axios.delete(
    `${config.API_URL_CARBON}/accounts/${accountNumber}${
      !!year ? '?year=' + year : ''
    }`
  )
