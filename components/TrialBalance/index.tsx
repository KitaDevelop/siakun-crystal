import { Table, TableHeader } from '@components/Table'
import {
  BalanceRow,
  RowRelativePosition,
  RowTypeSelectionMode,
  TrialBalanceRow,
  TrialBalanceTable,
} from '@context/TrialBalanceContext/types'
import { useTrialBalance } from '@hooks/useTrialBalance'
import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { useYear } from '@hooks/useYear'

import { Controls } from './Controls'
import { DropdownRowType } from './DropdownRowType'
import { TableEditable } from './TableEditable'
import { TableReadOnly } from './TableReadOnly'

import * as XLSX from 'xlsx'
const { writeFile, utils } = XLSX

interface Props {}

export const Index = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { year } = useYear()

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

  // TYPE SELECTION
  const [mode, setMode] = useState<RowTypeSelectionMode>('add')
  const [position, setPosition] = useState<RowRelativePosition | undefined>()
  const [targetRow, setTargetRow] = useState<number>(0)
  const [targetTable, setTargetTable] = useState<TrialBalanceTable>('fp')

  // DOCUMENT EXPORTS
  const flattenJson = (data: TrialBalanceRow[]) => {
    var flatJson = []
    for (let row of data) {
      const { content } = row
      if (typeof content === 'string') {
        flatJson.push({ 'Nomor Akun': content })
      } else {
        const balanceRow = content as BalanceRow
        flatJson.push({
          'Nomor Akun': balanceRow.accountNo,
          'Nama Akun': balanceRow.accountName,
          'Beginning Balance': balanceRow?.startBalance,
          'Debit Movements': balanceRow?.movement?.debit,
          'Credit Movements': balanceRow?.movement?.credit,
          'Ending Balance': balanceRow?.endBalance,
          'Debit Adjustments': balanceRow?.adjustment?.debit,
          'Credit Adjustments': balanceRow?.adjustment?.credit,
          'Adjusted Balance': balanceRow?.adjustedBalance,
        })
      }
    }
    return flatJson
  }

  const exportAsXlsx = () => {
    console.log(financialPosition)
    console.log(activities)

    var workbook = utils.book_new()
    var financialPositionSheet = utils.json_to_sheet(flattenJson(financialPosition))
    var activitiesSheet = utils.json_to_sheet(flattenJson(activities))
    utils.book_append_sheet(workbook, financialPositionSheet, 'Statement of Financial Position')
    utils.book_append_sheet(workbook, activitiesSheet, 'Statement of Activities')
    return writeFile(workbook, `trial_balance_${year}.xlsx`)
  }

  return (
    <div>
      <Controls {...{ isEditing, setIsEditing, exportAsXlsx }} position="top" />
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
      <Controls {...{ isEditing, setIsEditing, year, exportAsXlsx }} position="bottom" />
    </div>
  )
}

export default Index
