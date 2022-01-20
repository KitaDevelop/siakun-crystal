export type Action =
  | { type: 'set_transactions'; transactions: Transaction[] }
  | { type: 'set_receipt'; receipt: File }
  | { type: 'set_date'; date: string }
  | { type: 'set_desc'; description: string }
export type Dispatch = (action: Action) => void
export type State = {
  date: string
  description: string
  receipt?: File
  transactions: Transaction[] // dummy
}
export type JournalEntryProviderProps = { children: React.ReactNode }
export type JournalEntry = {
  id: number
  date: string
  description: string
  transactions: Transaction[]
}
export type Transaction = {
  id: number
  accNumber: string
  accName: string
  debit?: number
  credit?: number
}
