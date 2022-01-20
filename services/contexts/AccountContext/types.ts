export interface Account {
  id: number
  accountNumber: string
  name: string
  description: string
  category: AccountCategory
  normalBalance?: NormalBalance
  type?: AccountType
}
export type Action =
  | { type: 'set_accounts'; payload: Account[] }
  | { type: 'set_account'; account: Account }
  | { type: 'set_parent_acc'; parent: string }
  | { type: 'set_account_no'; accNo: string }
  | { type: 'set_account_name'; accName: string }
  | { type: 'set_desc'; desc: string }
  | { type: 'set_normal_balance'; normalBalance: NormalBalance }
  | { type: 'set_account_type'; accType: AccountType }
  | { type: 'set_desc'; desc: string }
  | { type: 'set_jenis'; jenis: AccountCategory }
  | { type: 'set_sub_accounts'; subAccounts: Account[] }
export type Dispatch = (action: Action) => void
export interface State extends Account {
  accounts: Account[]
  parentAccount: string
  subAccounts?: Account[]
}
export type AccountContextValue = {
  accounts: Account[]
  account: State
  dispatch: Dispatch
}
export type AccountProviderProps = { children: React.ReactNode }
export enum AccountCategory {
  NONE,
  HEADING = 'heading',
  AKUN = 'akun',
  JUMLAH = 'jumlah',
}
export enum AccountType {
  NERACA = 'neraca',
  LABARUGI = 'labarugi',
}
export enum NormalBalance {
  DEBIT = 'debit',
  CREDIT = 'credit',
}
export const EmptyAccount: Account = {
  id: -1,
  accountNumber: '',
  name: '',
  description: '',
  category: AccountCategory.NONE,
}
