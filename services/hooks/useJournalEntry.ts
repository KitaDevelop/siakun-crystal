import React from 'react'
import { JournalEntryContext } from '@context/JournalEntryContext/JournalEntryProvider'

export function useJournalEntry() {
  const context = React.useContext(JournalEntryContext)
  if (context === undefined) {
    throw new Error(
      'useJournalEntry must be used within a JournalEntryProvider'
    )
  }
  return context
}
