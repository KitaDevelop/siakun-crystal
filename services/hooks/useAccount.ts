import React from 'react'
import { AccountContext } from '@context/AccountContext/AccountProvider'

export function useAccount() {
  const context = React.useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount must be used within a AccountProvider')
  }
  return context
}
