import {
  SelectAccountOption,
  SelectJenisOption,
} from '@context/AccountContext/types'

export const isSelectJenisOption = (v: any): v is SelectJenisOption => {
  if ((v as SelectJenisOption).value !== undefined) return v.value
  return false
}

export const isSelectAccountOption = (v: any): v is SelectAccountOption => {
  if ((v as SelectAccountOption).value !== undefined) return v.value
  return false
}
