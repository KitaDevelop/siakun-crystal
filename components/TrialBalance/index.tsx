import { SelectYearOption } from '@components/JournalEntries/FilterControls'
import { Table, TableHeader } from '@components/Table'
import { CURRENT_YEAR } from '@constants/.'
import { RowRelativePosition, RowTypeSelectionMode, TrialBalanceTable } from '@context/TrialBalanceContext/types'
import { useTrialBalance } from '@hooks/useTrialBalance'
import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { Controls } from './Controls'
import { DropdownRowType } from './DropdownRowType'
import { TableEditable } from './TableEditable'
import { TableReadOnly } from './TableReadOnly'

interface Props {}

export const Index = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [year, setYear] = useState<SelectYearOption[]>(years.filter((option) => option.value === CURRENT_YEAR))

  const {
    state: { financialPosition, activities },
  } = useTrialBalance()

  const onAddRowFP = () => {
    setMode('add')
    setTargetTable('fp')
    setPosition(undefined)
  }

  const onAddRowAC = () => {
    setMode('add')
    setTargetTable('ac')
    setPosition(undefined)
  }

  // MODAL
  const [mode, setMode] = useState<RowTypeSelectionMode>('add')
  const [position, setPosition] = useState<RowRelativePosition | undefined>()
  const [targetRow, setTargetRow] = useState<number>(0)
  const [targetTable, setTargetTable] = useState<TrialBalanceTable>('fp')

  return (
    <div>
      <Controls {...{ year, years, setYear, isEditing, setIsEditing }} position="top" />
      <div className="font-bold text-xl mb-2">I. Statement of Financial Position</div>
      <Table zebra>
        <TableHeader trialBalance />
        {isEditing ? (
          <TableEditable {...{ setTargetRow, setMode, setPosition, data: financialPosition, targetTable: 'fp' }} />
        ) : (
          <TableReadOnly data={financialPosition} />
        )}
      </Table>
      {isEditing && (
        <DropdownRowType className="dropdown-top" {...{ targetRow, targetTable, mode, position }}>
          <div className="btn btn-ghost text-primary" onClick={() => onAddRowFP()}>
            <IoAdd className="mr-2" />
            Add More Row
          </div>
        </DropdownRowType>
      )}
      <div className="divider" />
      <div className="font-bold text-xl mb-2">II. Statement of Activities</div>
      <Table zebra>
        <TableHeader trialBalance />
        {isEditing ? (
          <TableEditable {...{ setTargetRow, setMode, setPosition, data: activities, targetTable: 'ac' }} />
        ) : (
          <TableReadOnly data={activities} />
        )}
      </Table>
      {isEditing && (
        <DropdownRowType className="dropdown-top" {...{ targetRow, targetTable, mode, position }}>
          <div className="btn btn-ghost text-primary mt-2" onClick={() => onAddRowAC()}>
            <IoAdd className="mr-2" />
            Add More Row
          </div>
        </DropdownRowType>
      )}
      <Controls {...{ isEditing, setIsEditing }} position="bottom" />
    </div>
  )
}

const years: SelectYearOption[] = [
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
]

export default Index
