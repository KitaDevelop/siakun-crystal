import React, { createContext, useReducer, useState } from 'react'

const INITIAL_STATE = {
  isCollapsed: false,
}

type Action = { type: 'toggle_collapse' }
type Dispatch = (action: Action) => void
type State = { isCollapsed: boolean }
type SidebarProviderProps = { children: React.ReactNode }

const SidebarContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const sidebarReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'toggle_collapse': {
      return { ...state, isCollapsed: !state.isCollapsed }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [state, dispatch] = React.useReducer(sidebarReducer, INITIAL_STATE)

  const value = { state, dispatch }
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export { useSidebar, SidebarProvider }
