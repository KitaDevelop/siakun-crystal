export const TrialBalanceReducer = (
  state: TrialBalanceState,
  action: TrialBalanceAction
) => {
  const EmptyRow: BalanceRow = {
    accountNumber: '',
    accountName: '',
    movement: {},
    adjustment: {},
  }
  const { financialPosition, activities } = state

  switch (action.type) {
    case 'set_financial_position':
      return { ...state, financialPosition: action.financialPosition }

    case 'set_activities':
      return { ...state, activities: action.activities }

    case 'fp_add_row':
      var tempFP = [...financialPosition]
      var newRow: TrialBalanceRow = {
        id: Date.now(),
        type: action.rowType,
        content: action.rowType === 'Header' ? '' : EmptyRow,
      }
      if (action.position) {
        var currentPosition: number =
          tempFP.findIndex((t) => t.id === action.id) +
          (action.position === 'above' ? 0 : 1)
        tempFP.splice(currentPosition, 0, newRow)
        return {
          ...state,
          financialPosition: tempFP,
        }
      }
      return {
        ...state,
        financialPosition: [...financialPosition, newRow],
      }

    case 'fp_delete_row':
      var tempFP = [...financialPosition]
      var index: number = tempFP.findIndex((t) => t.id === action.id)
      tempFP.splice(index, 1)
      return { ...state, financialPosition: tempFP }

    case 'fp_edit_row':
      var tempFP = [...financialPosition]
      var idx = tempFP.findIndex((t) => t.id === action.id)
      tempFP.splice(idx, 1, action.row)

      return { ...state, financialPosition: tempFP }

    case 'ac_add_row':
      var newRow: TrialBalanceRow = {
        id: Date.now(),
        type: action.rowType,
        content: action.rowType === 'Header' ? '' : EmptyRow,
      }
      if (action.position) {
        var tempAC = [...activities]
        var currentPosition: number =
          tempAC.findIndex((t) => t.id === action.id) +
          (action.position === 'above' ? 0 : 1)
        tempAC.splice(currentPosition, 0, newRow)
        return {
          ...state,
          activities: tempAC,
        }
      }
      return { ...state, activities: [...activities, newRow] }

    case 'ac_delete_row':
      var tempAC = [...activities]
      var index: number = tempAC.findIndex((t) => t.id === action.id)
      tempAC.splice(index, 1)
      return { ...state, activities: tempAC }

    case 'ac_edit_row':
      var tempAC = [...activities]
      var idx = tempAC.findIndex((t) => t.id === action.id)
      tempAC.splice(idx, 1, action.row)
      return {
        ...state,
        activities: tempAC,
      }

    case 'set_is_locked':
      return { ...state, isLocked: action.isLocked }
  }
}
