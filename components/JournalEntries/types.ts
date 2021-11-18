export type JournalEntry = {
  id: number
  date: string
  description: string
  transactions: Transaction[]
}

export type Transaction = {
  accNumber: string
  accName: string
  debit?: number
  credit?: number
}
