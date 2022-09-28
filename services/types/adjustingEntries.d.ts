type AdjustingEntryAction =
  | { type: 'set_entries'; entries: AdjustingEntry[] }
  | { type: 'set_id'; id: number }
  | { type: 'set_entry'; entry: AdjustingEntry }
  | { type: 'set_empty' }
  | { type: 'set_transactions'; transactions: Transaction[] }
  | { type: 'set_desc'; description: string }
  | { type: 'set_is_locked'; isLocked: boolean }
type AdjustingEntryDispatch = (action: AdjustingEntryAction) => void
interface AdjustingEntryState extends AdjustingEntry {
  isLocked: boolean
  entries: AdjustingEntry[]
}
type AdjustingEntryProviderProps = { children: React.ReactNode }
type AdjustingEntry = {
  id: number
  description: string
  transactions: Transaction[]
}
interface UpdateAdjustingEntryPayload {
  id: number
  entry: AdjustingEntryPayload
  year: number
}
interface CreateAdjustingEntryPayload {
  entry: AdjustingEntryPayload
  year: number
}
interface AdjustingEntryPayload {
  description: string
  transactions: {
    accountNumber?: string
    debit: number
    credit: number
  }[]
}
interface AdjustingEntryResponse {
  isLocked: boolean
  data: AdjustingEntry[]
}
interface SingleAdjustingEntryResponse {
  data: AdjustingEntry
}
