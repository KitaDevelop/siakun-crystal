import { DeletePayload, handleError, OPTIONS_NO_CACHE } from '@api/.'
import { useMutation, useQuery } from 'react-query'
import {
  createJournalEntry,
  deleteJournalEntry,
  getJournalEntries,
  getJournalEntriesByAccount,
  getJournalEntry,
  updateJournalEntry,
} from './endpoints'

export const useFetchJournalEntries = (year?: number, oID?: number) => {
  return useQuery(
    `journal-entries-${year}-${oID}`,
    () => getJournalEntries(year, oID),
    OPTIONS_NO_CACHE
  )
}

export const useFetchJournalEntriesByAccount = (
  accountId: number,
  oID?: number
) => {
  return useQuery(
    `journal-entries-by-account:${accountId}-${oID}`,
    () => getJournalEntriesByAccount(accountId, oID),
    OPTIONS_NO_CACHE
  )
}

export const useFetchJournalEntry = (id: number, year?: number) => {
  return useQuery(
    `journal-entry-${year}:${id}`,
    () => getJournalEntry(id, year),
    { ...OPTIONS_NO_CACHE, enabled: id != -1 }
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
