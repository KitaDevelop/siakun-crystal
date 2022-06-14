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
  | { type: 'set_is_locked'; isLocked: boolean }

export type Dispatch = (action: Action) => void

export type State = {
  isLocked: boolean
  financialPosition: TrialBalanceRow[]
  activities: TrialBalanceRow[]
}

export type TrialBalanceTable = 'fp' | 'ac'
export type RowType = 'Blank' | 'Data' | 'Header'
export type RowRelativePosition = 'below' | 'above'
export type RowTypeSelectionMode = 'add' | 'edit'

export interface TrialBalanceRow {
  id: number
  type: RowType
  content: string | BalanceRow
}

export type BalanceRow = {
  accountNumber: string
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

export type TrialBalanceResponse = {
  data: TrialBalancePayload[]
  isLocked: boolean
}

export type TrialBalancePayload = {
  tableNumber: number
  rows: TrialBalanceRowPayload[]
}

export interface TrialBalanceRowPayload {
  id: number
  type: RowType
}

export interface BlankRowPayload extends TrialBalanceRowPayload {
  accountNumber: string
  accountName?: string
  beginningBalance: number
  movementDebit: number
  movementCredit: number
  endingBalance: number
  adjustmentDebit: number
  adjustmentCredit: number
  adjustedTrialBalance: number
}

export interface DataRowPayload extends TrialBalanceRowPayload {
  accountNumber: string
}

export interface HeaderRowPayload extends TrialBalanceRowPayload {
  header: string
}

export interface CreateTrialBalancePayload extends TrialBalancePayload {
  year: number
}

export interface UpdateTrialBalancePayload extends TrialBalancePayload {
  year: number
}

export type TrialBalanceProviderProps = { children: React.ReactNode }
