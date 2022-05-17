import { LocalStorageWorker } from '@api/localStorageHelper'
import React, { createContext, useEffect, useReducer, useState } from 'react'

const localStorage = new LocalStorageWorker()

type Role = 'auditor' | 'organization'
type Action =
  | { type: 'toggle_collapse' }
  | { type: 'set_collapse'; payload: boolean }
type Dispatch = (action: Action) => void
type State = { isCollapsed: boolean; role: Role }
type SidebarProviderProps = { children: React.ReactNode }

const INITIAL_STATE: State = {
  isCollapsed: false,
  role: 'organization',
}

const SidebarContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

const sidebarReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_collapse':
      return { ...state, isCollapsed: action.payload }
    case 'toggle_collapse':
      localStorage.add('sidebarCollapsed', String(!state.isCollapsed))
      return { ...state, isCollapsed: !state.isCollapsed }
  }
}

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [state, dispatch] = React.useReducer(sidebarReducer, INITIAL_STATE)

  const value = { state, dispatch }
  useEffect(() => {
    dispatch({ type: 'set_collapse', payload: Boolean(localStorage.get('sidebarCollapsed')) })
  }, [])

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
