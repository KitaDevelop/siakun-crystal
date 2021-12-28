export type Action =
  | { type: 'set_financial_position'; financialPosition: TrialBalanceRow[] }
  | { type: 'set_activities'; activities: TrialBalanceRow[] }
  | {
      type: 'fp_add_row'
      rowType: RowType
      id?: number
      position?: RowRelativePosition
    }
  | { type: 'fp_delete_row'; id: number }
  | { type: 'fp_edit_row'; id: number; row: TrialBalanceRow }
  | {
      type: 'ac_add_row'
      rowType: RowType
      id?: number
      position?: RowRelativePosition
    }
  | { type: 'ac_delete_row'; id: number }
  | { type: 'ac_edit_row'; id: number; row: TrialBalanceRow }

export type Dispatch = (action: Action) => void

export type State = {
  financialPosition: TrialBalanceRow[]
  activities: TrialBalanceRow[]
}

export type TrialBalanceTable = 'fp' | 'ac'
export type RowType = 'blank' | 'data' | 'header'
export type RowRelativePosition = 'below' | 'above'
export type RowTypeSelectionMode = 'add' | 'edit'

export interface TrialBalanceRow {
  id: number
  rowType: RowType
  content: string | BalanceRow
}

export type BalanceRow = {
  accountNo: string
  accountName: string
  startBalance?: number
  endBalance?: number
  adjustedBalance?: number
  movement: {
    debit?: number
    credit?: number
  }
  adjustment: {
    debit?: number
    credit?: number
  }
}

export type TrialBalanceProviderProps = { children: React.ReactNode }
