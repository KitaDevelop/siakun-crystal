import React, { createContext, useReducer, useState } from 'react'
import SidebarReducer from './SidebarReducer'

const INITIAL_STATE = {
  isCollapsed: false,
}

export interface SidebarState {
  isCollapsed: boolean
  toggleCollapse?: () => void
}

const SidebarContext = createContext<SidebarState>(INITIAL_STATE)

const SidebarProvider: React.FC = ({ children }) => {
  const [isCollapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => {
    console.log(isCollapsed)
    setCollapsed(!isCollapsed)
  }

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export { SidebarContext, SidebarProvider }
