import { Action, State } from './types'

export const AccountReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_parent_acc':
      return { ...state, parentAccount: action.parent }
    case 'set_account_name':
      return { ...state, accountName: action.accName }
    case 'set_account_no':
      return { ...state, accountNo: action.accNo }
    case 'set_desc':
      return { ...state, desc: action.desc }
    case 'set_jenis':
      return { ...state, jenis: action.jenis }
    case 'set_account_type':
      return { ...state, type: action.accType }
    case 'set_normal_balance':
      return { ...state, normalBalance: action.normalBalance }
    case 'set_sub_accounts':
      return { ...state, subAccounts: action.subAccounts }
  }
}
