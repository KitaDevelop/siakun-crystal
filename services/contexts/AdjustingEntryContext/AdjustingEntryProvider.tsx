import React from 'react'
import { AdjustingEntryReducer } from './AdjustingEntryReducer'

const INITIAL_STATE: AdjustingEntryState = {
  isLocked: false,
  entries: [],
  id: -1,
  description: '',
  transactions: [{ id: Date.now(), accountNumber: '' }],
}

const AdjustingEntryContext = React.createContext<
  { state: AdjustingEntryState; dispatch: AdjustingEntryDispatch } | undefined
>(undefined)

const AdjustingEntryProvider = ({ children }: AdjustingEntryProviderProps) => {
  const [state, dispatch] = React.useReducer(AdjustingEntryReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <AdjustingEntryContext.Provider value={value}>{children}</AdjustingEntryContext.Provider>
}

export { AdjustingEntryContext, AdjustingEntryProvider }
