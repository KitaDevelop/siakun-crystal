import { DeletePayload, handleError, OPTIONS } from '@api/.'
import { JournalEntry } from '@context/JournalEntryContext/types'
import { useMutation, useQuery } from 'react-query'
import {
  createJournalEntry,
  deleteJournalEntry,
  getJournalEntries,
  getJournalEntry,
  updateJournalEntry,
} from './endpoints'

export interface UpdateJournalEntryPayload {
  id: number
  entry: JournalEntryPayload
  year: number
}

export interface CreateJournalEntryPayload {
  entry: JournalEntryPayload
  year: number
}

export interface JournalEntryPayload {
  date: string
  description: string
  receipt?: string
  transactions: {
    accountNumber: string
    debit: number
    credit: number
  }[]
}

export interface JournalEntryResponse {
  isLocked: boolean
  data: JournalEntry[]
}

export const useFetchJournalEntries = (year?: number) => {
  return useQuery('journal-entries', () => getJournalEntries(year), OPTIONS)
}

export const useFetchJournalEntry = (id: number, year?: number) => {
  return useQuery(
    `journal-entry:${id}`,
    () => getJournalEntry(id, year),
    OPTIONS
  )
}

export const useCreateJournalEntry = () => {
  return useMutation(
    ({ entry, year }: CreateJournalEntryPayload) =>
      createJournalEntry(entry, year),
    {
      onError: handleError,
    }
  )
}

export const useUpdateJournalEntry = () => {
  return useMutation(
    ({ id, entry, year }: UpdateJournalEntryPayload) =>
      updateJournalEntry(id, entry, year),
    { onError: handleError }
  )
}

export const useDeleteJournalEntry = () => {
  return useMutation(
    ({ id, year }: DeletePayload) => deleteJournalEntry(id, year),
    { onError: handleError }
  )
}
