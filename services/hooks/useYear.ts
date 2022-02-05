import { YearContext } from '@context/YearContext'
import { useContext } from 'react'

export function useYear() {
  const context = useContext(YearContext)
  if (context === undefined) {
    throw new Error('useYear must be used within a YearProvider')
  }
  return context
}
