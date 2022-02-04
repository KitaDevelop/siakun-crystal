import { DeletePayload, handleError, OPTIONS } from '@api/.'
import { AdjustingEntry } from '@context/AdjustingEntryContext/types'
import { useMutation, useQuery } from 'react-query'
import {
  createAdjustingEntry,
  deleteAdjustingEntry,
  getAdjustingEntries,
  getAdjustingEntry,
  updateAdjustingEntry,
} from './endpoints'

interface UpdateAdjustingEntryPayload {
  id: number
  entry: AdjustingEntry
  year: number
}

export const useFetchAdjustingEntries = (year?: number) => {
  return useQuery('adjusting-entries', () => getAdjustingEntries(year), OPTIONS)
}

export const useFetchAdjustingEntry = (id: number, year?: number) => {
  return useQuery(
    `adjusting-entry:${id}`,
    () => getAdjustingEntry(id, year),
    OPTIONS
  )
}

export const useCreateAdjustingEntry = () => {
  return useMutation((entry: AdjustingEntry) => createAdjustingEntry(entry), {
    onError: handleError,
  })
}

export const useUpdateAdjustingEntry = () => {
  return useMutation(
    ({ id, entry, year }: UpdateAdjustingEntryPayload) =>
      updateAdjustingEntry(id, entry, year),
    { onError: handleError }
  )
}

export const useDeleteAdjustingEntry = () => {
  return useMutation(
    ({ id, year }: DeletePayload) => deleteAdjustingEntry(id, year),
    { onError: handleError }
  )
}
