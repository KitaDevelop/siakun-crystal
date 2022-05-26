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

export interface UpdateAdjustingEntryPayload {
  id: number
  entry: AdjustingEntryPayload
  year: number
}

export interface CreateAdjustingEntryPayload {
  entry: AdjustingEntryPayload
  year: number
}

export interface AdjustingEntryPayload {
  description: string
  transactions: {
    accountNumber?: string
    debit: number
    credit: number
  }[]
}

export interface AdjustingEntryResponse {
  isLocked: boolean
  data: AdjustingEntry[]
}

export interface SingleAdjustingEntryResponse {
  data: AdjustingEntry
}

export const useFetchAdjustingEntries = (year?: number, oID?: number) => {
  return useQuery(
    'adjusting-entries',
    () => getAdjustingEntries(year, oID),
    OPTIONS
  )
}

export const useFetchAdjustingEntry = (id: number, year?: number) => {
  return useQuery(
    `adjusting-entry:${id}`,
    () => getAdjustingEntry(id, year),
    OPTIONS
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
