import React from 'react'
import { AccountReducer } from './AccountReducer'
import { AccountContextValue, AccountProviderProps, State, EmptyAccount } from './types'

const INITIAL_STATE: State = {
  accounts: [],
  ...EmptyAccount,
}
const AccountContext = React.createContext<AccountContextValue | undefined>(undefined)

const AccountProvider = ({ children }: AccountProviderProps) => {
  const [state, dispatch] = React.useReducer(AccountReducer, INITIAL_STATE)
  const { accounts } = state

  const value = { accounts, account: state, dispatch }
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}
export { AccountContext, AccountProvider }
