import { Transaction } from '@context/JournalEntryContext/types'

export type Action =
  | { type: 'set_transactions'; transactions: Transaction[] }
  | { type: 'set_desc'; description: string }
export type Dispatch = (action: Action) => void
export type State = {
  description: string
  transactions: Transaction[] // dummy
}
export type AdjustingEntryProviderProps = { children: React.ReactNode }
export type AdjustingEntry = {
  id: number
  description: string
  transactions: Transaction[]
}
