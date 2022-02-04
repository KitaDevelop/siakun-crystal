import React from 'react'
import { JournalEntryReducer } from './JournalEntryReducer'
import { JournalEntryProviderProps, Dispatch, State } from './types'

const INITIAL_STATE: State = {
  date: '',
  description: '',
  transactions: [{ id: Date.now(), accountNumber: '', accountName: '' }],
}

const JournalEntryContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const JournalEntryProvider = ({ children }: JournalEntryProviderProps) => {
  const [state, dispatch] = React.useReducer(JournalEntryReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <JournalEntryContext.Provider value={value}>{children}</JournalEntryContext.Provider>
}

export { JournalEntryContext, JournalEntryProvider }
