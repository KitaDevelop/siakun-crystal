import { handleError, OPTIONS } from '@api/.'
import {
  CreateTrialBalancePayload,
  UpdateTrialBalancePayload,
} from '@context/TrialBalanceContext/types'
import { useMutation, useQuery } from 'react-query'
import {
  createTrialBalance,
  getTrialBalance,
  updateTrialBalance,
} from './endpoints'

export const useFetchTrialBalance = (year?: number) => {
  return useQuery('journal-entries', () => getTrialBalance(year), OPTIONS)
}

export const useCreateTrialBalance = () => {
  return useMutation(
    ({ year, ...table }: CreateTrialBalancePayload) =>
      createTrialBalance(table, year),
    {
      onError: handleError,
    }
  )
}

export const useUpdateTrialBalance = () => {
  return useMutation(
    ({ year, ...table }: UpdateTrialBalancePayload) =>
      updateTrialBalance(table, year),
    { onError: handleError }
  )
}
