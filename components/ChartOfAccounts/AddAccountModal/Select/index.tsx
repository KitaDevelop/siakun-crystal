import { CSSObjectWithLabel } from 'react-select'

export const customStyles = {
  placeholder: (styles: CSSObjectWithLabel) => ({ ...styles, lineHeight: 2, fontSize: '0.875rem' }),
  control: (styles: CSSObjectWithLabel) => ({ ...styles, borderRadius: 8 }),
}
