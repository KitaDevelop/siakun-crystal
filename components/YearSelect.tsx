import { isSelectYearOption, years } from '@constants/years'
import { useYear } from '@hooks/useYear'
import React from 'react'
import Select from 'react-select'
import { customStyles } from './ChartOfAccounts/AddAccountModal/Select'

export const YearSelect = () => {
  const { year, setYear } = useYear()
  const chosenYear = years.find((x) => x.value === year)

  return (
    <Select
      options={years}
      value={chosenYear}
      styles={customStyles}
      closeMenuOnSelect
      isSearchable
      onChange={(v) => {
        if (isSelectYearOption(v)) setYear(v.value)
      }}
    />
  )
}
