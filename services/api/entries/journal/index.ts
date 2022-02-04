import { DeletePayload, handleError } from '@api/.'
import { JournalEntry } from '@context/JournalEntryContext/types'
import { useMutation, useQuery } from 'react-query'
import {
  createJournalEntry,
  deleteJournalEntry,
  getJournalEntries,
  getJournalEntry,
  updateJournalEntry,
} from './endpoints'

interface UpdateJournalEntryPayload {
  id: number
  entry: JournalEntry
  year: number
}

export const useFetchJournalEntries = (year?: number) => {
  return useQuery('journal-entries', () => getJournalEntries(year))
}

export const useFetchJournalEntry = (id: number, year?: number) => {
  return useQuery(`journal-entry:${id}`, () => getJournalEntry(id, year))
}

export const useCreateJournalEntry = () => {
  return useMutation((entry: JournalEntry) => createJournalEntry(entry), {
    onError: handleError,
  })
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
