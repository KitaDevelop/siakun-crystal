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
  return useQuery('organizations', () => getOrganizations(year), OPTIONS)
}
