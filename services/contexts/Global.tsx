import React from 'react'
import { AccountProvider } from './AccountContext'
import { SidebarProvider } from './SidebarContext'

interface Props {
  children?: React.ReactNode
}
export const GlobalProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AccountProvider>{children}</AccountProvider>
    </SidebarProvider>
  )
}
