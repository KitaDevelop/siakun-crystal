import React from 'react'
import { JournalEntryReducer } from './JournalEntryReducer'

const INITIAL_STATE: JournalEntryState = {
  isLocked: false,
  entries: [],
  id: -1,
  date: '',
  description: '',
  transactions: [{ id: Date.now(), accountNumber: '' }],
}

const JournalEntryContext = React.createContext<
  { state: JournalEntryState; dispatch: JournalEntryDispatch } | undefined
>(undefined)

const JournalEntryProvider = ({ children }: JournalEntryProviderProps) => {
  const [state, dispatch] = React.useReducer(JournalEntryReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <JournalEntryContext.Provider value={value}>{children}</JournalEntryContext.Provider>
}

export { JournalEntryContext, JournalEntryProvider }
