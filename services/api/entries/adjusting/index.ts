import { DeletePayload, handleError, OPTIONS } from '@api/.'
import { useMutation, useQuery } from 'react-query'
import {
  createAdjustingEntry,
  deleteAdjustingEntry,
  getAdjustingEntries,
  getAdjustingEntry,
  updateAdjustingEntry,
} from './endpoints'

export const useFetchAdjustingEntries = (year?: number, oID?: number) => {
  return useQuery(
    `adjusting-entries-${year}-${oID}`,
    () => getAdjustingEntries(year, oID),
    OPTIONS
  )
}

export const useFetchAdjustingEntry = (id: number, year?: number) => {
  return useQuery(
    `adjusting-entry-${year}:${id}`,
    () => getAdjustingEntry(id, year),
    { ...OPTIONS, enabled: id != -1 }
  )
}

export const useCreateAdjustingEntry = () => {
  return useMutation(
    ({ entry, year }: CreateAdjustingEntryPayload) =>
      createAdjustingEntry(entry, year),
    {
      onError: handleError,
    }
  )
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
