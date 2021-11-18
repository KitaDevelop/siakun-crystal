export type Action =
  | { type: 'set_parent_acc'; parent: string }
  | { type: 'set_account_no'; accNo: string }
  | { type: 'set_account_name'; accName: string }
  | { type: 'set_desc'; desc: string }
  | { type: 'set_normal_balance'; normalBalance: NormalBalance }
  | { type: 'set_account_type'; accType: AccountType }
  | { type: 'set_desc'; desc: string }
  | { type: 'set_jenis'; jenis: JenisAccount }
  | { type: 'set_sub_accounts'; subAccounts: SubAccount[] }
export type Dispatch = (action: Action) => void
export type State = {
  parentAccount: string
  accountNo: string
  accountName: string
  desc: string
  jenis: JenisAccount
  normalBalance?: NormalBalance
  type?: AccountType
  subAccounts?: SubAccount[]
}
export type AccountProviderProps = { children: React.ReactNode }
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
