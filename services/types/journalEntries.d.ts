type JournalEntryAction =
  | { type: 'set_entries'; entries: JournalEntry[] }
  | { type: 'set_id'; id: number }
  | { type: 'set_entry'; entry: JournalEntry }
  | { type: 'set_empty' }
  | { type: 'set_transactions'; transactions: Transaction[] }
  | { type: 'set_receipt'; receipt: string }
  | { type: 'set_date'; date: string }
  | { type: 'set_desc'; description: string }
  | { type: 'set_is_locked'; isLocked: boolean }
type JournalEntryDispatch = (action: JournalEntryAction) => void
interface JournalEntryState extends JournalEntry {
  isLocked: boolean
  entries: JournalEntry[]
}
type JournalEntryProviderProps = { children: React.ReactNode }
type JournalEntry = {
  id: number
  date: string
  description: string
  receipt?: string
  transactions: Transaction[]
}
type Transaction = {
  id: number
  account?: {
    name: string
    number: string
  }
  accountNumber?: string
  debit?: number
  credit?: number
}
interface UpdateJournalEntryPayload {
  id: number
  entry: JournalEntryPayload
  year: number
}

interface CreateJournalEntryPayload {
  entry: JournalEntryPayload
  year: number
}

interface JournalEntryPayload {
  date: string
  description: string
  receipt?: string
  transactions: {
    accountNumber: string
    debit: number
    credit: number
  }[]
}

interface JournalEntryResponse {
  isLocked: boolean
  data: JournalEntry[]
}
