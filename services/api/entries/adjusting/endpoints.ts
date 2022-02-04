import { AdjustingEntry } from '@context/AdjustingEntryContext/types'
import axios from 'axios'
import config from 'config'

export const getAdjustingEntries = (year?: number) =>
  axios.get<AdjustingEntry[]>(
    `${config.API_URL_CARBON}/adjusting-entries${!!year ? '?year=' + year : ''}`
  )

export const getAdjustingEntry = (id: number, year?: number) =>
  axios.get<AdjustingEntry>(
    `${config.API_URL_CARBON}/adjusting-entries/${id}${
      !!year ? '?year=' + year : ''
    }`
  )

export const createAdjustingEntry = (entry: AdjustingEntry, year?: number) => {
  return axios.post<AdjustingEntry>(
    `${config.API_URL_CARBON}/adjusting-entries${
      !!year ? '?year=' + year : ''
    }`,
    entry
  )
}

export const updateAdjustingEntry = (
  id: number,
  entry: AdjustingEntry,
  year?: number
) => {
  return axios.put<AdjustingEntry>(
    `${config.API_URL_CARBON}/adjusting-entries/${id}${
      !!year ? '?year=' + year : ''
    }`,
    entry
  )
}

export const deleteAdjustingEntry = (id: number, year?: number) => {
  return axios.delete<AdjustingEntry>(
    `${config.API_URL_CARBON}/adjusting-entries/${id}${
      !!year ? '?year=' + year : ''
    }`
  )
}
