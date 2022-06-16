import { Organization } from '@context/OrganizationContext/types'
import axios from 'axios'
import config from 'config'
import { useQuery } from 'react-query'
import { OPTIONS } from '..'

export const getOrganizations = (year?: number) =>
  axios.get<Organization[]>(
    `${config.API_URL_CARBON}/organizations${!!year ? '?year=' + year : ''}`
  )

export const useFetchOrganizations = (year?: number) => {
  return useQuery(
    `organizations-${year}`,
    () => getOrganizations(year),
    OPTIONS
  )
}

export const lockReport = (organizationID: number, year: number) =>
  axios.post(
    `${config.API_URL_CARBON}/reports/${year}/lock?organizationID=${organizationID}`
  )

export const unlockReport = (organizationID: number, year: number) =>
  axios.post(
    `${config.API_URL_CARBON}/reports/${year}/unlock?organizationID=${organizationID}`
  )
