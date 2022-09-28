import React from 'react'
import { TrialBalanceReducer } from './TrialBalanceReducer'

const INITIAL_STATE: TrialBalanceState = {
  isLocked: false,
  financialPosition: [],
  activities: [],
}

const TrialBalanceContext = React.createContext<
  { state: TrialBalanceState; dispatch: TrialBalanceDispatch } | undefined
>(undefined)

const TrialBalanceProvider = ({ children }: TrialBalanceProviderProps) => {
  const [state, dispatch] = React.useReducer(TrialBalanceReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <TrialBalanceContext.Provider value={value}>{children}</TrialBalanceContext.Provider>
}

export { TrialBalanceContext, TrialBalanceProvider }
