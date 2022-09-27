export const AccountReducer = (state: AccountState, action: AccountAction) => {
  switch (action.type) {
    case 'set_accounts':
      return { ...state, accounts: action.payload }
    case 'set_account':
      return { ...state, ...action.account }
    case 'set_parent_number':
      return { ...state, parentNumber: action.parentNumber, parent: action.parent }
    case 'set_account_name':
      return { ...state, name: action.accName }
    case 'set_account_no':
      return { ...state, number: action.accNo }
    case 'set_desc':
      return { ...state, description: action.desc }
    case 'set_jenis':
      return { ...state, category: action.jenis }
    case 'set_account_type':
      return { ...state, type: action.accType }
    case 'set_normal_balance':
      return { ...state, normalBalance: action.normalBalance }
    case 'set_beginning_balance':
      return { ...state, beginningBalance: action.beginningBalance }
    case 'set_sub_accounts':
      return { ...state, subAccounts: action.subAccounts }
    case 'set_is_locked':
      return { ...state, isLocked: action.isLocked }
  }
}
