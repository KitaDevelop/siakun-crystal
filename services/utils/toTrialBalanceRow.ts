import {
  BalanceRow,
  BlankRowPayload,
  HeaderRowPayload,
  TrialBalancePayload,
  TrialBalanceRow,
  TrialBalanceRowPayload,
} from '@context/TrialBalanceContext/types'

export const toTrialBalanceTable = (payload: TrialBalancePayload[]) => {
  const payloadSorted = payload.sort((a, b) => a.tableNumber - b.tableNumber)
  return {
    financialPosition_: toTrialBalanceRow(payloadSorted[0]),
    activities_: toTrialBalanceRow(payloadSorted[1]),
  }
}

const toTrialBalanceRow = (payload: TrialBalancePayload): TrialBalanceRow[] => {
  let table: TrialBalanceRow[] = []
  if (!payload.rows) return table

  for (let entry of payload.rows) {
    const { type } = entry
    if (type === 'Header') table.push(toHeaderRow(entry as HeaderRowPayload))
    else table.push(toBalanceRow(entry as BlankRowPayload))
  }

  return table
}

export const toBalanceRow = (entry: BlankRowPayload): TrialBalanceRow => {
  return {
    id: entry.id,
    type: entry.type,
    content: {
      accountNumber: entry.accountNumber,
      accountName: entry?.accountName || '',
      startBalance: entry.beginningBalance,
      endBalance: entry.endingBalance,
      adjustedBalance: entry.adjustedTrialBalance,
      movement: {
        credit: entry.movementCredit,
        debit: entry.movementDebit,
      },
      adjustment: {
        credit: entry.adjustingCredit,
        debit: entry.adjustingDebit,
      },
    },
  }
}

const toHeaderRow = (entry: HeaderRowPayload): TrialBalanceRow => {
  return {
    id: entry.id,
    type: entry.type,
    content: entry.header,
  }
}

export const toTrialBalancePayload = (payload: TrialBalanceRow[]) => {
  let table: TrialBalanceRowPayload[] = []

  for (let row of payload) {
    const { type } = row
    if (type === 'Header') table.push(toRowPayload(row))
    else table.push(toRowPayload(row))
  }

  return table
}

const toRowPayload = (
  row: TrialBalanceRow
): HeaderRowPayload | BlankRowPayload => {
  if (row.type === 'Header')
    return {
      type: row.type,
      header: row.content,
    } as HeaderRowPayload
  const r = row.content as BalanceRow
  return {
    type: row.type,
    accountNumber: r.accountNumber,
    accountName: r.accountName,
    beginningBalance: r.startBalance || 0,
    endingBalance: r.endBalance || 0,
    adjustedTrialBalance: r.adjustedBalance || 0,
    movementCredit: r.movement.credit || 0,
    movementDebit: r.movement.debit || 0,
    adjustingCredit: r.adjustment.credit || 0,
    adjustingDebit: r.adjustment.debit || 0,
  } as BlankRowPayload
}
