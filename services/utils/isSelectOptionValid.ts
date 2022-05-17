import {
  SelectAccountOption,
  SelectJenisOption,
} from '@context/AccountContext/types'
import { SelectOrganizationOption } from '@context/OrganizationContext/types'

export const isSelectJenisOption = (v: any): v is SelectJenisOption => {
  if ((v as SelectJenisOption).value !== undefined) return v.value
  return false
}

export const isSelectAccountOption = (v: any): v is SelectAccountOption => {
  if ((v as SelectAccountOption).value !== undefined) return v.value
  return false
}

export const isSelectOrganizationOption = (
  v: any
): v is SelectOrganizationOption => {
  if ((v as SelectOrganizationOption).value !== undefined) return v.value
  return false
}
