export const AccountReducer = (state: AccountState, action: AccountAction) => {
  switch (action.type) {
    case 'set_accounts':
      return { ...state, accounts: action.payload }
    case 'set_target_account':
      return { ...state, targetAccountNumber: action.accNo }
    case 'set_is_locked':
      return { ...state, isLocked: action.isLocked }
    case 'set_is_modal_open':
      return { ...state, isModalOpen: action.to }
  }
}
