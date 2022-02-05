import { CURRENT_YEAR } from '@constants/years'
import React, { createContext, useState } from 'react'

type YearProviderProps = { children: React.ReactNode }

const YearContext = createContext<{ year: number; setYear: (year: number) => void } | undefined>(undefined)

const YearProvider = ({ children }: YearProviderProps) => {
  const [year, setYear] = useState(CURRENT_YEAR)

  return <YearContext.Provider value={{ year, setYear }}>{children}</YearContext.Provider>
}

export { YearContext, YearProvider }
