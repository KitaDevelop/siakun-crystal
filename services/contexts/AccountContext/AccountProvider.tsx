import { useFetchAccounts } from '@api/accounts'
import { EmptyAccount } from '@constants/accounts'
import { ROLE } from '@constants/auth'
import useAuth from '@hooks/useAuth'
import { useOrganization } from '@hooks/useOrganization'
import { useYear } from '@hooks/useYear'
import React, { useEffect, useState } from 'react'
import { AccountReducer } from './AccountReducer'

const INITIAL_STATE: AccountState = {
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
  const { organizationView } = useOrganization()
  const { userProfile } = useAuth()
  const { isLoading, isRefetching, data, refetch } = useFetchAccounts(
    year,
    userProfile?.role != ROLE.LEMBAGA ? organizationView?.id : undefined
  )

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
