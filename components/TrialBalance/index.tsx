import { SelectYearOption } from '@components/JournalEntries/FilterControls'
import { Table, TableHeader } from '@components/Table'
import { CURRENT_YEAR } from '@constants/.'
import { useTrialBalance } from '@hooks/useTrialBalance'
import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { Controls } from './Controls'
import { ModalRowType } from './ModalRowType'
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
    setIsOpen(true)
    setMode('add')
    setTargetTable('fp')
    setPosition(undefined)
  }

  const onAddRowAC = () => {
    setIsOpen(true)
    setMode('add')
    setTargetTable('ac')
    setPosition(undefined)
  }

  // MODAL
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<'add' | 'edit'>('add')
  const [position, setPosition] = useState<'above' | 'below' | undefined>()
  const [targetRow, setTargetRow] = useState<number>(0)
  const [targetTable, setTargetTable] = useState<'fp' | 'ac'>('fp')

  return (
    <div>
      <Controls {...{ year, years, setYear, isEditing, setIsEditing }} position="top" />
      <div className="font-bold text-xl mb-2">I. Statement of Financial Position</div>
      <Table zebra>
        <TableHeader trialBalance />
        {isEditing ? (
          <TableEditable
            {...{ setTargetRow, setIsOpen, setMode, setPosition, data: financialPosition, targetTable: 'fp' }}
          />
        ) : (
          <TableReadOnly data={financialPosition} />
        )}
      </Table>
      {isEditing && (
        <div className="btn btn-ghost text-primary" onClick={() => onAddRowFP()}>
          <IoAdd className="mr-2" />
          Add More Row
        </div>
      )}
      <div className="divider" />
      <div className="font-bold text-xl mb-2">II. Statement of Activities</div>
      <Table zebra>
        <TableHeader trialBalance />
        {isEditing ? (
          <TableEditable {...{ setTargetRow, setIsOpen, setMode, setPosition, data: activities, targetTable: 'ac' }} />
        ) : (
          <TableReadOnly data={activities} />
        )}
      </Table>
      {isEditing && (
        <div className="btn btn-ghost text-primary" onClick={() => onAddRowAC()}>
          <IoAdd className="mr-2" />
          Add More Row
        </div>
      )}
      <Controls {...{ isEditing, setIsEditing }} position="bottom" />
      <ModalRowType {...{ targetRow, targetTable, isOpen, setIsOpen, mode, position }} />
    </div>
  )
}

const years: SelectYearOption[] = [
  { value: 2021, label: '2021' },
  { value: 2020, label: '2020' },
  { value: 2019, label: '2019' },
]

export default Index