import axios from 'axios'
import config from 'config'

export const getAccounts = (year?: number, oID?: number) =>
  axios.get<AccountResponse>(
    `${config.API_URL_CARBON}/accounts${!!year ? '?year=' + year : ''}${
      !!oID ? '&organizationID=' + oID : ''
    }`
  )

export const getAccount = (accountId: string, year?: number) =>
  axios.get<SingleAccountResponse>(
    `${config.API_URL_CARBON}/accounts/${accountId}${
      !!year ? '?year=' + year : ''
    }`
  )

export const createAccount = (account: Account) => {
  const { id, ...newAccount } = account
  return axios.post<Account>(`${config.API_URL_CARBON}/accounts`, newAccount)
}

export const updateAccount = (
  accountNumber: string,
  account: Partial<Account>,
  year?: number
) => {
  return axios.put<Account>(
    `${config.API_URL_CARBON}/accounts/${accountNumber}${
      !!year ? '?year=' + year : ''
    }`,
    account
  )
}

export const deleteAccount = (accountNumber: string, year?: number) =>
  axios.delete(
    `${config.API_URL_CARBON}/accounts/${accountNumber}${
      !!year ? '?year=' + year : ''
    }`
  )
