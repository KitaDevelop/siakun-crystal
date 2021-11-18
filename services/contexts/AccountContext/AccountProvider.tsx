import React from 'react'
import { AccountReducer } from './AccountReducer'
import { AccountProviderProps, Dispatch, JenisAccount, State } from './types'

const INITIAL_STATE: State = {
  parentAccount: '',
  accountNo: '',
  accountName: '',
  desc: '',
  jenis: JenisAccount.NONE,
}

const AccountContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const AccountProvider = ({ children }: AccountProviderProps) => {
  const [state, dispatch] = React.useReducer(AccountReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

function useAccount() {
  const context = React.useContext(AccountContext)
  if (context === undefined) {
    throw new Error('useAccount must be used within a AccountProvider')
  }
  return context
}

export { useAccount, AccountProvider }
