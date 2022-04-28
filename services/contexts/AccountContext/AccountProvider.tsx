import { useFetchAccounts } from '@api/accounts'
import { useYear } from '@hooks/useYear'
import React, { useEffect } from 'react'
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

  const { year } = useYear()
  const { isLoading, data, refetch } = useFetchAccounts(year)

  useEffect(() => {
    if (!isLoading && data) dispatch({ type: 'set_accounts', payload: data.data })
  }, [isLoading, data])

  useEffect(() => {
    refetch()
  }, [year])

  const value = { accounts, account: state, dispatch }
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}
export { AccountContext, AccountProvider }
