import { Action, State } from './types'

export const JournalEntryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_date':
      return { ...state, date: action.date }
    case 'set_desc':
      return { ...state, description: action.description }
    case 'set_receipts':
      return { ...state, receipts: action.receipts }
    case 'set_transactions':
      return { ...state, transactions: action.transactions }
  }
}
