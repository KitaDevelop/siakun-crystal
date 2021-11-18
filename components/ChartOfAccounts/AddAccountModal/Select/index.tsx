import { JenisAccount } from '@context/AccountContext/types'
import { CSSObjectWithLabel } from 'react-select'

export const customStyles = {
  placeholder: (styles: CSSObjectWithLabel) => ({ ...styles, lineHeight: 2, fontSize: '0.875rem' }),
  control: (styles: CSSObjectWithLabel) => ({ ...styles, borderRadius: 8 }),
}

export const jenisAccount = [
  { value: JenisAccount.HEADING, label: 'Heading' },
  { value: JenisAccount.AKUN, label: 'Akun' },
  { value: JenisAccount.JUMLAH, label: 'Jumlah' },
]

export const dummyAccounts = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]
