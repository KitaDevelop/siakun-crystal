import React, { useState } from 'react'
import { Organization, OrganizationContextType, OrganizationProviderProps } from './types';


const OrganizationContext = React.createContext<OrganizationContextType | undefined>(undefined)

const OrganizationProvider = ({ children }: OrganizationProviderProps) => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [organizationView, setOrganizationView] = useState<Organization | null>(null)

  return <OrganizationContext.Provider value={{ organizations, setOrganizations, organizationView, setOrganizationView }}>{children}</OrganizationContext.Provider>
}

export { OrganizationContext, OrganizationProvider }
