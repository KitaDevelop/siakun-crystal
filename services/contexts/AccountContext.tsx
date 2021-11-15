import React, { createContext, useReducer, useState } from 'react'

type Action =
  | { type: 'set_parent_acc'; parent: string }
  | { type: 'set_account_no'; accNo: string }
  | { type: 'set_account_name'; accName: string }
  | { type: 'set_desc'; desc: string }
  | { type: 'set_normal_balance'; normalBalance: NormalBalance }
  | { type: 'set_account_type'; accType: AccountType }
  | { type: 'set_desc'; desc: string }
  | { type: 'set_jenis'; jenis: JenisAccount }
  | { type: 'set_sub_accounts'; subAccounts: SubAccount[] }
type Dispatch = (action: Action) => void
type State = {
  parentAccount: string
  accountNo: string
  accountName: string
  desc: string
  jenis: JenisAccount
  normalBalance?: NormalBalance
  type?: AccountType
  subAccounts?: SubAccount[]
}
type AccountProviderProps = { children: React.ReactNode }
export type SubAccount = { id: number; accountNumber: string; name: string }
export enum JenisAccount {
  NONE,
  HEADING,
  AKUN,
  JUMLAH,
}
export enum AccountType {
  NERACA = 'neraca',
  LABARUGI = 'labarugi',
}
export enum NormalBalance {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

const INITIAL_STATE: State = {
  parentAccount: '',
  accountNo: '',
  accountName: '',
  desc: '',
  jenis: JenisAccount.NONE,
}

const AccountContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const AccountReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_parent_acc':
      return { ...state, parentAccount: action.parent }
    case 'set_account_name':
      return { ...state, accountName: action.accName }
    case 'set_account_no':
      return { ...state, accountNo: action.accNo }
    case 'set_desc':
      return { ...state, desc: action.desc }
    case 'set_jenis':
      return { ...state, jenis: action.jenis }
    case 'set_account_type':
      return { ...state, type: action.accType }
    case 'set_normal_balance':
      return { ...state, normalBalance: action.normalBalance }
    case 'set_sub_accounts':
      return { ...state, subAccounts: action.subAccounts }
  }
}

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
