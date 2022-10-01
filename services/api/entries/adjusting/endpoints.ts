import axios from 'axios'
import config from 'config'

export const getAdjustingEntries = (year?: number, oID?: number) =>
  axios.get<AdjustingEntryResponse>(
    `${config.API_URL_CARBON}/adjusting-entries${
      !!year ? '?year=' + year : ''
    }${!!oID ? '&organizationID=' + oID : ''}`
  )

export const getAdjustingEntry = (id: number, year?: number) =>
  axios.get<SingleAdjustingEntryResponse>(
    `${config.API_URL_CARBON}/adjusting-entries/${id}${
      !!year ? '?year=' + year : ''
    }`
  )

export const createAdjustingEntry = (
  entry: AdjustingEntryPayload,
  year?: number
) => {
  return axios.post<AdjustingEntry>(
    `${config.API_URL_CARBON}/adjusting-entries${
      !!year ? '?year=' + year : ''
    }`,
    entry
  )
}

export const updateAdjustingEntry = (
  id: number,
  entry: AdjustingEntryPayload,
  year?: number
) => {
  return axios.put(
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
