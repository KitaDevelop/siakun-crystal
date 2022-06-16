import { lockReport, unlockReport, useFetchOrganizations } from '@api/organizations';
import { useYear } from '@hooks/useYear';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Organization, OrganizationContextType, OrganizationProviderProps } from './types';


const OrganizationContext = React.createContext<OrganizationContextType | undefined>(undefined)

const OrganizationProvider = ({ children }: OrganizationProviderProps) => {
  const { year } = useYear()
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [organizationView, setOrganizationView] = useState<Organization | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const { isLoading, data } = useFetchOrganizations(year)

  useEffect(() => {
    if (organizations.length == 0 && !isLoading && data) {
      const { data: organization_ } = data
      setOrganizations(organization_)
    }
  }, [])

  const toggleLocked = () => {
    if (!organizationView) {
      toast.error('Choose an organization to view first.')
      return
    }

    if (isLocked) unlockReport(organizationView.id, year)
    else lockReport(organizationView.id, year)
    setIsLocked(!isLocked)
  }

  return <OrganizationContext.Provider value={{ organizations, setOrganizations, organizationView, setOrganizationView, isLocked, setIsLocked, toggleLocked }}>{children}</OrganizationContext.Provider>
}

export { OrganizationContext, OrganizationProvider }
