import React from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AccountProvider } from './AccountContext/AccountProvider'
import { AdjustingEntryProvider } from './AdjustingEntryContext/AdjustingEntryProvider'
import { AuthProvider } from './AuthContext/AuthProvider'
import { JournalEntryProvider } from './JournalEntryContext/JournalEntryProvider'
import { SidebarProvider } from './SidebarContext'
import { TrialBalanceProvider } from './TrialBalanceContext/TrialBalanceProvider'
import { YearProvider } from './YearContext'

const queryClient = new QueryClient()

interface Props {
  children?: React.ReactNode
}

export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AuthProvider>
        <YearProvider>
          <SidebarProvider>
            <JournalEntryProvider>
              <AdjustingEntryProvider>
                <AccountProvider>
                  <TrialBalanceProvider>{children}</TrialBalanceProvider>
                </AccountProvider>
              </AdjustingEntryProvider>
            </JournalEntryProvider>
          </SidebarProvider>
        </YearProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="bottom-center" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  )
}
