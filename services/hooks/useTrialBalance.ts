import React from 'react'
import { TrialBalanceContext } from '@context/TrialBalanceContext/TrialBalanceProvider'

export function useTrialBalance() {
  const context = React.useContext(TrialBalanceContext)
  if (context === undefined) {
    throw new Error(
      'useTrialBalance must be used within a TrialBalanceProvider'
    )
  }
  return context
}
