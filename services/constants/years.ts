import { CURRENT_YEAR } from '.'

export type SelectYearOption = {
  label: string
  value: number
}

export const years: SelectYearOption[] = Array.from({
  length: CURRENT_YEAR - 2019,
}).map((_, i) => ({ value: CURRENT_YEAR - i, label: `${CURRENT_YEAR - i}` }))
