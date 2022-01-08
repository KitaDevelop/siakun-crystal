import { AdjustingEntryContext } from '@context/AdjustingEntryContext/AdjustingEntryProvider'
import React from 'react'

export function useAdjustingEntry() {
  const context = React.useContext(AdjustingEntryContext)
  if (context === undefined) {
    throw new Error(
      'useAdjustingEntry must be used within a AdjustingEntryProvider'
    )
  }
  return context
}
