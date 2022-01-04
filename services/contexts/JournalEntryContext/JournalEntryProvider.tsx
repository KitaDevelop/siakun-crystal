import React from 'react'
import { JournalEntryReducer } from './JournalEntryReducer'
import { JournalEntryProviderProps, Dispatch, State, Transaction } from './types'

const INITIAL_STATE: State = {
  date: '',
  description: '',
  receipts: [],
  transactions: [{ id: Date.now(), accNumber: '', accName: '' }],
}

const JournalEntryContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const JournalEntryProvider = ({ children }: JournalEntryProviderProps) => {
  const [state, dispatch] = React.useReducer(JournalEntryReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <JournalEntryContext.Provider value={value}>{children}</JournalEntryContext.Provider>
}

export { JournalEntryContext, JournalEntryProvider }
