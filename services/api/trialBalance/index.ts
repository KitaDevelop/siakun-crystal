import { handleError, OPTIONS } from '@api/.'
import { UpdateTrialBalancePayload } from '@context/TrialBalanceContext/types'
import { useMutation, useQuery } from 'react-query'
import { getTrialBalance, updateTrialBalance } from './endpoints'

export const useFetchTrialBalance = (year?: number) => {
  return useQuery(`trial-balance-${year}`, () => getTrialBalance(year), OPTIONS)
}

export const useUpdateTrialBalance = () => {
  return useMutation(
    ({ year, ...table }: UpdateTrialBalancePayload) =>
      updateTrialBalance(table, year),
    { onError: handleError }
  )
}
