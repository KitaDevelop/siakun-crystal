export type Action =
  | { type: 'set_entries'; entries: JournalEntry[] }
  | { type: 'set_id'; id: number }
  | { type: 'set_entry'; entry: JournalEntry }
  | { type: 'set_empty' }
  | { type: 'set_transactions'; transactions: Transaction[] }
  | { type: 'set_receipt'; receipt: string }
  | { type: 'set_date'; date: string }
  | { type: 'set_desc'; description: string }
export type Dispatch = (action: Action) => void
export interface State extends JournalEntry {
  entries: JournalEntry[]
}
export type JournalEntryProviderProps = { children: React.ReactNode }
export type JournalEntry = {
  id: number
  date: string
  description: string
  receipt?: string
  transactions: Transaction[]
}
export type Transaction = {
  id: number
  accountNumber: string
  accountName: string
  debit?: number
  credit?: number
}
