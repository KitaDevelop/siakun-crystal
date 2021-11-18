import React, { useState } from 'react'
import FilterControls, { SelectYearOption } from './FilterControls'

interface Props {}

export const Index = (props: Props) => {
  const [year, setYear] = useState<SelectYearOption[]>(
    years.filter((option) => option.value === new Date().getFullYear())
  )

  return (
    <div>
      <FilterControls {...{ years, year, setYear }} />
    </div>
  )
}

const years: SelectYearOption[] = [
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
]

export default Index
