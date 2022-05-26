import {
  BlankRowPayload,
  TrialBalancePayload,
  TrialBalanceResponse,
} from '@context/TrialBalanceContext/types'
import axios from 'axios'
import config from 'config'

export const getTrialBalance = (year?: number) =>
  axios.get<TrialBalanceResponse>(
    `${config.API_URL_CARBON}/trial-balances${!!year ? '?year=' + year : ''}`
  )

export const updateTrialBalance = (
  table: TrialBalancePayload,
  year?: number
) => {
  return axios.put(
    `${config.API_URL_CARBON}/trial-balances${!!year ? '?year=' + year : ''}`,
    table
  )
}

/** Fetches aggregate values of selected account to fill data row cells */
export const getAggregateAccountData = (accountNumber: string, year?: number) =>
  axios.get<{ data: BlankRowPayload }>(
    `${config.API_URL_CARBON}/trial-balances/${accountNumber}${
      !!year ? '?year=' + year : ''
    }`
  )
