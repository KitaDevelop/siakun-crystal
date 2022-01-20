import { Action, State } from './types'

export const JournalEntryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_date':
      return { ...state, date: action.date }
    case 'set_desc':
      return { ...state, description: action.description }
    case 'set_receipt':
      return { ...state, receipt: action.receipt }
    case 'set_transactions':
      return { ...state, transactions: action.transactions }
  }
}
