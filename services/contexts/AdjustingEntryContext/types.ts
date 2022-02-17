import { Transaction } from '@context/JournalEntryContext/types'

export type Action =
  | { type: 'set_entries'; entries: AdjustingEntry[] }
  | { type: 'set_id'; id: number }
  | { type: 'set_entry'; entry: AdjustingEntry }
  | { type: 'set_empty' }
  | { type: 'set_transactions'; transactions: Transaction[] }
  | { type: 'set_desc'; description: string }
export type Dispatch = (action: Action) => void
export interface State extends AdjustingEntry {
  entries: AdjustingEntry[]
}
export type AdjustingEntryProviderProps = { children: React.ReactNode }
export type AdjustingEntry = {
  id: number
  description: string
  transactions: Transaction[]
}
