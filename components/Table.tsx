import React from 'react'

interface TableHeaderProps {
  cells?: string[]
  trialBalance?: Boolean
}

interface TableBodyProps {
  children: React.ReactNode
  className?: string
}

interface TableProps {
  children: React.ReactNode
  zebra?: Boolean
}

export const TableHeader = ({ cells, trialBalance }: TableHeaderProps) => {
  return trialBalance ? (
    <thead>
      <tr>
        <th rowSpan={2}>acc no.</th>
        <th rowSpan={2}>account name</th>
        <th rowSpan={2}>
          beginning
          <br />
          balance
        </th>
        <th colSpan={2}>movements</th>
        <th rowSpan={2}>
          ending
          <br />
          balance
        </th>
        <th colSpan={2}>adjustments</th>
        <th rowSpan={2}>
          adjusted
          <br />
          trial balance
        </th>
      </tr>
      <tr>
        <th className="nested">debit</th>
        <th className="nested">credit</th>
        <th className="nested">debit</th>
        <th className="nested">credit</th>
      </tr>
    </thead>
  ) : (
    <thead>
      <tr>
        {cells?.map((cell) => (
          <th key={cell} className="whitespace-pre-line">
            {cell}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export const TableBody = ({ children, className }: TableBodyProps) => {
  return <tbody {...{ className }}>{children}</tbody>
}

export const Table = ({ children, zebra }: TableProps) => {
  return <table className={`table w-full table-compact ${zebra && 'table-zebra'}`}>{children}</table>
}
