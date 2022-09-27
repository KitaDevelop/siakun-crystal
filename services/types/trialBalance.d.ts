type TrialBalanceAction =
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

type TrialBalanceDispatch = (action: TrialBalanceAction) => void

type TrialBalanceState = {
  isLocked: boolean
  financialPosition: TrialBalanceRow[]
  activities: TrialBalanceRow[]
}

type TrialBalanceTable = 'fp' | 'ac'
type RowType = 'Blank' | 'Data' | 'Header'
type RowRelativePosition = 'below' | 'above'
type RowTypeSelectionMode = 'add' | 'edit'

interface TrialBalanceRow {
  id: number
  type: RowType
  content: string | BalanceRow
}

type BalanceRow = {
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

type TrialBalanceResponse = {
  data: TrialBalancePayload[]
  isLocked: boolean
}

type TrialBalancePayload = {
  tableNumber: number
  rows: TrialBalanceRowPayload[]
}

interface TrialBalanceRowPayload {
  id: number
  type: RowType
}

interface BlankRowPayload extends TrialBalanceRowPayload {
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

interface DataRowPayload extends TrialBalanceRowPayload {
  accountNumber: string
}

interface HeaderRowPayload extends TrialBalanceRowPayload {
  header: string
}

interface CreateTrialBalancePayload extends TrialBalancePayload {
  year: number
}

interface UpdateTrialBalancePayload extends TrialBalancePayload {
  year: number
}

type TrialBalanceProviderProps = { children: React.ReactNode }
