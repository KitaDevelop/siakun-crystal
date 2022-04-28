import { Action, State } from './types'

export const AdjustingEntryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_entries':
      return { ...state, entries: action.entries }
    case 'set_id':
      return { ...state, id: action.id }
    case 'set_entry':
      return { ...state, ...action.entry }
    case 'set_empty':
      return { ...state, description: '', transactions: [] }
    case 'set_desc':
      return { ...state, description: action.description }
    case 'set_transactions':
      return { ...state, transactions: action.transactions }
  }
}
