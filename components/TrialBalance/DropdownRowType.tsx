import {
  RowRelativePosition,
  RowType,
  RowTypeSelectionMode,
  TrialBalanceRow,
  TrialBalanceTable,
} from '@context/TrialBalanceContext/types'
import { useTrialBalance } from '@hooks/useTrialBalance'
import React from 'react'

interface Props {
  children: React.ReactNode
  targetRow: number
  targetTable: TrialBalanceTable
  mode: RowTypeSelectionMode
  position?: RowRelativePosition
  tabIndex?: number
  className?: string
}

export const DropdownRowType = ({ targetRow, targetTable, mode, position, className, tabIndex, children }: Props) => {
  const {
    state: { financialPosition, activities },
    dispatch,
  } = useTrialBalance()

  const findRow = () => (targetTable == 'fp' ? financialPosition : activities).findIndex((t) => t.id === targetRow)

  const onTypeChosen = (chosen: RowType) => {
    if (targetTable == 'ac') updateTypeOnAC(chosen)
    else updateTypeOnFP(chosen)
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
  }

  const updateTypeOnAC = (chosen: RowType) => {
    if (mode === 'add') {
      dispatch({ type: 'ac_add_row', rowType: chosen as RowType, id: targetRow, position: position })
    } else {
      var tempRow = activities[findRow()]
      var row: TrialBalanceRow = {
        ...tempRow,
        content: tempRow.type !== 'Header' && chosen === 'Header' ? '' : tempRow.content,
        type: chosen as RowType,
      }

      dispatch({ type: 'ac_edit_row', id: targetRow, row: row })
    }
  }

  const updateTypeOnFP = (chosen: RowType) => {
    if (mode === 'add') {
      dispatch({ type: 'fp_add_row', rowType: chosen as RowType, id: targetRow, position: position })
    } else {
      var tempRow = financialPosition[findRow()]
      var row: TrialBalanceRow = {
        ...tempRow,
        content: tempRow.type !== 'Header' && chosen === 'Header' ? '' : tempRow.content,
        type: chosen as RowType,
      }
      dispatch({ type: 'fp_edit_row', id: targetRow, row: row })
    }
  }

  return (
    <div className={`dropdown ${className}`}>
      <div tabIndex={tabIndex || 0}>{children}</div>
      <ul
        tabIndex={tabIndex || 0}
        className="p-2 shadow-lg menu dropdown-content bg-base-100 rounded-box w-52 overflow-visible"
      >
        <li data-tip="Manually enter values for each cell" className="tooltip tooltip-right">
          <a onClick={() => onTypeChosen('Blank')}>Blank Row</a>
        </li>
        <li data-tip="Display up-to-date data of chosen account" className="tooltip tooltip-right">
          <a onClick={() => onTypeChosen('Data')}>Data Row</a>
        </li>
        <li data-tip="Header spans all column" className="tooltip tooltip-right">
          <a onClick={() => onTypeChosen('Header')}>Header Row</a>
        </li>
      </ul>
    </div>
  )
}
