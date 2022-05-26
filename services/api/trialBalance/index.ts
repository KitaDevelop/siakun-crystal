import { handleError, OPTIONS } from '@api/.'
import { UpdateTrialBalancePayload } from '@context/TrialBalanceContext/types'
import { useMutation, useQuery } from 'react-query'
import { getTrialBalance, updateTrialBalance } from './endpoints'

export const useFetchTrialBalance = (year?: number, oID?: number) => {
  return useQuery(
    `trial-balance-${year}`,
    () => getTrialBalance(year, oID),
    OPTIONS
  )
}

export const useUpdateTrialBalance = () => {
  return useMutation(
    ({ year, ...table }: UpdateTrialBalancePayload) =>
      updateTrialBalance(table, year),
    { onError: handleError }
  )
}
