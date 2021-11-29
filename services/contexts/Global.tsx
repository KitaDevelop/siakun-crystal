import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AccountProvider } from './AccountContext/AccountProvider'
import { SidebarProvider } from './SidebarContext'

const queryClient = new QueryClient()

interface Props {
  children?: React.ReactNode
}
export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SidebarProvider>
        <AccountProvider>{children}</AccountProvider>
      </SidebarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
