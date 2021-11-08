import React, { createContext, useReducer, useState } from 'react'

type Action =
  | { type: 'set_parent_acc'; parent: string }
  | { type: 'set_account_no'; accNo: string }
  | { type: 'set_account_name'; accName: string }
  | { type: 'set_desc'; desc: string }
  | { type: 'set_jenis'; jenis: JenisAccount }
type Dispatch = (action: Action) => void
type State = {
  parentAccount: string
  accountNo: string
  accountName: string
  desc: string
  jenis: JenisAccount
  normalBalance?: NormalBalance
  category?: AccountCategory
}
type AccountProviderProps = { children: React.ReactNode }
export enum JenisAccount {
  NONE,
  HEADING,
  AKUN,
  JUMLAH,
}
export enum AccountCategory {
  NERACA,
  LABARUGI,
}
export enum NormalBalance {
  DEBIT,
  KREDIT,
}

const INITIAL_STATE = {
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
