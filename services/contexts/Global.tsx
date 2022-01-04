import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AccountProvider } from './AccountContext/AccountProvider'
import { AdjustingEntryProvider } from './AdjustingEntryContext/AdjustingEntryProvider'
import { AuthProvider } from './AuthContext/AuthProvider'
import { JournalEntryProvider } from './JournalEntryContext/JournalEntryProvider'
import { SidebarProvider } from './SidebarContext'
import AxiosProvider from './AxiosContext/AxiosProvider'
const queryClient = new QueryClient()

interface Props {
  children?: React.ReactNode
}

export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <AxiosProvider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <AuthProvider>
          <SidebarProvider>
            <JournalEntryProvider>
              <AdjustingEntryProvider>
                <AccountProvider>{children}</AccountProvider>
              </AdjustingEntryProvider>
            </JournalEntryProvider>
          </SidebarProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </AxiosProvider>
  )
}
