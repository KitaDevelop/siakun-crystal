import React from 'react'
import { TrialBalanceReducer } from './TrialBalanceReducer'
import { Dispatch, State, TrialBalanceProviderProps } from './types'

const INITIAL_STATE: State = {
  isLocked: false,
  financialPosition: [],
  activities: [],
}

const TrialBalanceContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const TrialBalanceProvider = ({ children }: TrialBalanceProviderProps) => {
  const [state, dispatch] = React.useReducer(TrialBalanceReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <TrialBalanceContext.Provider value={value}>{children}</TrialBalanceContext.Provider>
}

export { TrialBalanceContext, TrialBalanceProvider }
