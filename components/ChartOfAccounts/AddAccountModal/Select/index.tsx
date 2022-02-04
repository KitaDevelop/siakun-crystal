import { Account, AccountCategory } from '@context/AccountContext/types'
import { CSSObjectWithLabel } from 'react-select'

export const customStyles = {
  placeholder: (styles: CSSObjectWithLabel) => ({ ...styles, lineHeight: 2, fontSize: '0.875rem' }),
  control: (styles: CSSObjectWithLabel) => ({ ...styles, borderRadius: 8 }),
}

export const jenisAccount = [
  { value: AccountCategory.HEADING, label: 'Heading' },
  { value: AccountCategory.AKUN, label: 'Akun' },
  { value: AccountCategory.JUMLAH, label: 'Jumlah' },
]

export type SelectJenisOption = {
  label: string
  value: AccountCategory
}

export type SelectAccountOption = {
  label: string
  value: Account
}

export const isSelectJenisOption = (v: any): v is SelectJenisOption => {
  if ((v as SelectJenisOption).value !== undefined) return v.value
  return false
}

export const isSelectAccountOption = (v: any): v is SelectAccountOption => {
  if ((v as SelectAccountOption).value !== undefined) return v.value
  return false
}
