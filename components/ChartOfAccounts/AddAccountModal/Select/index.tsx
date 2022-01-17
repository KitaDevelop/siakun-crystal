import { AccountCategory } from '@context/AccountContext/types'
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
