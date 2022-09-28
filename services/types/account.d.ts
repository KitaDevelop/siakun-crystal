interface Account {
  id: number
  parentNumber?: string
  number: string
  name: string
  description: string
  category: AccountCategory
  normalBalance?: NormalBalance
  type?: AccountType
  beginningBalance?: number
  subAccounts?: string[]
}
enum AccountCategory {
  NONE,
  HEADING = 'Heading',
  AKUN = 'Akun',
  JUMLAH = 'Jumlah',
}
enum AccountType {
  NERACA = 'Neraca',
  LABARUGI = 'Labarugi',
}
enum NormalBalance {
  DEBIT = 'Debit',
  CREDIT = 'Kredit',
}
type AccountAction =
  | { type: 'set_accounts'; payload: Account[] }
  // | { type: 'set_account'; account: Account }
  // | { type: 'set_parent_number'; parentNumber: string; parent: Account }
  | { type: 'set_target_account'; accNo: string }
  // | { type: 'set_account_name'; accName: string }
  // | { type: 'set_desc'; desc: string }
  // | { type: 'set_normal_balance'; normalBalance: NormalBalance }
  // | { type: 'set_account_type'; accType: AccountType }
  // | { type: 'set_beginning_balance'; beginningBalance: number }
  // | { type: 'set_jenis'; jenis: AccountCategory }
  // | { type: 'set_sub_accounts'; subAccounts: string[] }
  | { type: 'set_is_locked'; isLocked: boolean }
  | { type: 'set_is_modal_open'; to: boolean }
type AccountDispatch = (action: AccountDispatch) => void
interface AccountState {
  isLocked: boolean
  isModalOpen: boolean
  accounts: Account[]
  targetAccountNumber: string
}
type AccountContextValue = {
  accounts: Account[]
  targetAccountNumber: string
  isLocked: boolean
  isRefetching: boolean
  isModalOpen: boolean
  dispatch: Dispatch
}
type AccountProviderProps = { children: React.ReactNode }
type SelectJenisOption = {
  label: string
  value: AccountCategory
}
type SelectAccountOption = {
  label: string
  value: Account
}
interface AccountResponse {
  isLocked: boolean
  data: Account[]
}
interface SingleAccountResponse {
  data: Account
}
interface UpdateAccountPayload {
  accountNumber: string
  account: Partial<Account>
  year?: number
}
interface DeleteAccountPayload {
  accountNumber: string
  year?: number
}
interface AccountSelectOptions {
  value: string
  label: string
}
