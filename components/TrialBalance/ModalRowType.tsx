import { Modal } from '@components/Modal'
import { RowType, TrialBalanceRow } from '@context/TrialBalanceContext/types'
import { useTrialBalance } from '@hooks/useTrialBalance'
import React, { useState } from 'react'
import { capitalize } from 'services/utils/capitalize'

interface Props {
  targetRow: number
  isOpen: boolean
  setIsOpen: Function
  targetTable: 'fp' | 'ac'
  mode: 'add' | 'edit'
  position?: 'above' | 'below'
}

interface RowTypeButtonProps {
  rowType: RowType
  chosen: '' | RowType
  setChosen: (v: RowType) => void
}

export const ModalRowType = ({ targetRow, targetTable, isOpen, setIsOpen, mode, position }: Props) => {
  const {
    state: { financialPosition, activities },
    dispatch,
  } = useTrialBalance()
  const [chosen, setChosen] = useState<'' | RowType>('')

  const findRow = () => (targetTable == 'fp' ? financialPosition : activities).findIndex((t) => t.id === targetRow)

  const onTypeChosen = () => {
    setIsOpen(false)
    setChosen('')
    if (targetTable == 'ac') updateTypeOnAC()
    else updateTypeOnFP()
  }

  const updateTypeOnAC = () => {
    if (mode === 'add') {
      dispatch({ type: 'ac_add_row', rowType: chosen as RowType, id: targetRow, position: position })
    } else {
      var tempRow = activities[findRow()]
      var row: TrialBalanceRow = {
        ...tempRow,
        content: tempRow.rowType !== 'header' && chosen === 'header' ? '' : tempRow.content,
        rowType: chosen as RowType,
      }

      dispatch({ type: 'ac_edit_row', id: targetRow, row: row })
    }
  }

  const updateTypeOnFP = () => {
    if (mode === 'add') {
      dispatch({ type: 'fp_add_row', rowType: chosen as RowType, id: targetRow, position: position })
    } else {
      var tempRow = financialPosition[findRow()]
      var row: TrialBalanceRow = {
        ...tempRow,
        content: tempRow.rowType !== 'header' && chosen === 'header' ? '' : tempRow.content,
        rowType: chosen as RowType,
      }
      dispatch({ type: 'fp_edit_row', id: targetRow, row: row })
    }
  }

  return (
    <Modal {...{ isOpen, setIsOpen }}>
      <div className="font-bold text-xl mb-3">Select Row Type</div>
      <div className="flex flex-col gap-2">
        <RowTypeButton rowType="blank" {...{ chosen, setChosen }} />
        <RowTypeButton rowType="data" {...{ chosen, setChosen }} />
        <RowTypeButton rowType="header" {...{ chosen, setChosen }} />
      </div>
      <div className="modal-action">
        <div className="btn btn-ghost" onClick={() => setIsOpen(false)}>
          Cancel
        </div>
        <button className="btn btn-primary" disabled={chosen === ''} onClick={() => onTypeChosen()}>
          {mode === 'add' ? 'add' : 'save'}
        </button>
      </div>
    </Modal>
  )
}

const RowTypeButton = ({ rowType, chosen, setChosen }: RowTypeButtonProps) => {
  return (
    <div
      className={`btn btn-ghost normal-case flex flex-col bg-base-200 items-start font-normal ${
        chosen === rowType && 'bg-secondary hover:bg-secondary-focus'
      }`}
      onClick={() => setChosen(rowType)}
    >
      <div className={`font-bold mb-1 font-neutral ${chosen === rowType && 'text-secondary-content'}`}>
        {capitalize(rowType)} Row
      </div>
      <div className={chosen === rowType ? 'text-secondary-content opacity-75' : 'text-gray-500'}>
        {/* TODO: figure out what to do about the descriptions */}
        {rowType === 'blank'
          ? 'Manually enter values for each cell'
          : rowType === 'data'
          ? 'Choose an account to '
          : 'Spans all column'}
      </div>
    </div>
  )
}
