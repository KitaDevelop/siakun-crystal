import { TrialBalancePayload } from '@context/TrialBalanceContext/types'
import axios from 'axios'
import config from 'config'

export const getTrialBalance = (year?: number) =>
  axios.get<TrialBalancePayload[]>(
    `${config.API_URL_CARBON}/trial-balances${!!year ? '?year=' + year : ''}`
  )

export const createTrialBalance = (
  table: TrialBalancePayload,
  year?: number
) => {
  return axios.post<TrialBalancePayload>(
    `${config.API_URL_CARBON}/trial-balances${!!year ? '?year=' + year : ''}`,
    table
  )
}

export const updateTrialBalance = (
  table: TrialBalancePayload,
  year?: number
) => {
  const { tableNumber, ...tablePayload } = table
  return axios.put(
    `${config.API_URL_CARBON}/trial-balances/${tableNumber}${
      !!year ? '?year=' + year : ''
    }`,
    tablePayload
  )
}
