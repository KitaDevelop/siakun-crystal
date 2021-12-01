import React from 'react'
import { AdjustingEntryReducer } from './AdjustingEntryReducer'
import { AdjustingEntryProviderProps, Dispatch, State } from './types'

const INITIAL_STATE: State = {
  description: '',
  transactions: [{ id: Date.now(), accNumber: '', accName: '' }],
}

const AdjustingEntryContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const AdjustingEntryProvider = ({ children }: AdjustingEntryProviderProps) => {
  const [state, dispatch] = React.useReducer(AdjustingEntryReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <AdjustingEntryContext.Provider value={value}>{children}</AdjustingEntryContext.Provider>
}

function useAdjustingEntry() {
  const context = React.useContext(AdjustingEntryContext)
  if (context === undefined) {
    throw new Error('useAdjustingEntry must be used within a AdjustingEntryProvider')
  }
  return context
}

export { useAdjustingEntry, AdjustingEntryProvider }
