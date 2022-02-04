import { JournalEntry } from '@context/JournalEntryContext/types'
import axios from 'axios'
import config from 'config'

export const getJournalEntries = (year?: number) =>
  axios.get<JournalEntry[]>(
    `${config.API_URL_CARBON}/journal-entries${!!year ? '?year=' + year : ''}`
  )

export const getJournalEntry = (id: number, year?: number) =>
  axios.get<JournalEntry>(
    `${config.API_URL_CARBON}/journal-entries/${id}${
      !!year ? '?year=' + year : ''
    }`
  )

export const createJournalEntry = (entry: JournalEntry, year?: number) => {
  return axios.post<JournalEntry>(
    `${config.API_URL_CARBON}/journal-entries${!!year ? '?year=' + year : ''}`,
    entry
  )
}

export const updateJournalEntry = (
  id: number,
  entry: JournalEntry,
  year?: number
) => {
  return axios.put<JournalEntry>(
    `${config.API_URL_CARBON}/journal-entries/${id}${
      !!year ? '?year=' + year : ''
    }`,
    entry
  )
}

export const deleteJournalEntry = (id: number, year?: number) => {
  return axios.delete<JournalEntry>(
    `${config.API_URL_CARBON}/journal-entries/${id}${
      !!year ? '?year=' + year : ''
    }`
  )
}
