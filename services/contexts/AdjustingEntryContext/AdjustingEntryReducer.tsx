import { Action, State } from './types'

export const AdjustingEntryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_desc':
      return { ...state, description: action.description }
    case 'set_transactions':
      return { ...state, transactions: action.transactions }
  }
}
