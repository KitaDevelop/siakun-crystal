import { Action, State } from './types'

export const JournalEntryReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set_entries':
      return { ...state, entries: action.entries }
    case 'set_id':
      return { ...state, id: action.id }
    case 'set_entry':
      return { ...state, ...action.entry }
    case 'set_empty':
      return { ...state, date: '', description: '', receipt: '', transactions: [] }
    case 'set_date':
      return { ...state, date: action.date }
    case 'set_desc':
      return { ...state, description: action.description }
    case 'set_receipt':
      return { ...state, receipt: action.receipt }
    case 'set_transactions':
      return { ...state, transactions: action.transactions }
    case 'set_is_locked':
      return { ...state, isLocked: action.isLocked }
  }
}
