export interface Account {
  id: number
  parentNumber?: string
  parent?: Account
  number: string
  name: string
  description: string
  category: AccountCategory
  normalBalance?: NormalBalance
  type?: AccountType
  beginningBalance?: number
  subAccounts?: string[]
}
export type Action =
  | { type: 'set_accounts'; payload: Account[] }
  | { type: 'set_account'; account: Account }
  | { type: 'set_parent_number'; parentNumber: string }
  | { type: 'set_account_no'; accNo: string }
  | { type: 'set_account_name'; accName: string }
  | { type: 'set_desc'; desc: string }
  | { type: 'set_normal_balance'; normalBalance: NormalBalance }
  | { type: 'set_account_type'; accType: AccountType }
  | { type: 'set_beginning_balance'; beginningBalance: number }
  | { type: 'set_jenis'; jenis: AccountCategory }
  | { type: 'set_sub_accounts'; subAccounts: string[] }
  | { type: 'set_is_locked'; isLocked: boolean }
export type Dispatch = (action: Action) => void
export interface State extends Account {
  isLocked: boolean
  accounts: Account[]
}
export type AccountContextValue = {
  accounts: Account[]
  account: Account
  isLocked: boolean
  isRefetching: boolean
  dispatch: Dispatch
}
export type AccountProviderProps = { children: React.ReactNode }
export enum AccountCategory {
  NONE,
  HEADING = 'Heading',
  AKUN = 'Akun',
  JUMLAH = 'Jumlah',
}
export enum AccountType {
  NERACA = 'Neraca',
  LABARUGI = 'Labarugi',
}
export enum NormalBalance {
  DEBIT = 'Debit',
  CREDIT = 'Kredit',
}
export const EmptyAccount: Account = {
  id: -1,
  parentNumber: '',
  number: '',
  name: '',
  description: '',
  category: AccountCategory.NONE,
}
export type SelectJenisOption = {
  label: string
  value: AccountCategory
}
export type SelectAccountOption = {
  label: string
  value: Account
}
