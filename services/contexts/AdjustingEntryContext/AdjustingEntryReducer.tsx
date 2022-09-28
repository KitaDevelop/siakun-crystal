export const AdjustingEntryReducer = (state: AdjustingEntryState, action: AdjustingEntryAction) => {
  switch (action.type) {
    case 'set_entries':
      return { ...state, entries: action.entries }
    case 'set_id':
      return { ...state, id: action.id }
    case 'set_is_locked':
      return { ...state, isLocked: action.isLocked }
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
