import { useFetchAccounts } from '@api/accounts'
import { useYear } from '@hooks/useYear'
import React, { useEffect, useState } from 'react'
import { AccountReducer } from './AccountReducer'
import { AccountContextValue, AccountProviderProps, State, EmptyAccount } from './types'

const INITIAL_STATE: State = {
  isLocked: false,
  accounts: [],
  ...EmptyAccount,
}
const AccountContext = React.createContext<AccountContextValue | undefined>(undefined)

const AccountProvider = ({ children }: AccountProviderProps) => {
  const [state, dispatch] = React.useReducer(AccountReducer, INITIAL_STATE)
  const [isUpdating, setIsUpdating] = useState(false) // to reduce table jumping on rerender
  const { accounts, isLocked, ...account } = state

  const { year } = useYear()
  const { isLoading, isRefetching, data, refetch } = useFetchAccounts(year)

  useEffect(() => {
    if (!isLoading && data) {
      setIsUpdating(true)
      const { data: payload, isLocked } = data.data
      dispatch({ type: 'set_accounts', payload: payload || [] })
      dispatch({ type: 'set_is_locked', isLocked: isLocked })
      setIsUpdating(false)
    }
  }, [isLoading, data])

  useEffect(() => {
    refetch()
  }, [year])

  const value = { accounts, account, isLocked, isRefetching: isRefetching || isUpdating, dispatch }
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}
export { AccountContext, AccountProvider }
