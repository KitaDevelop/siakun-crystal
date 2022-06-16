import React from 'react'

export type Organization = {
  id: number
  name: string
  profilePicture: string
}
export type SelectOrganizationOption = { value: Organization; label: string }
export type OrganizationProviderProps = { children: React.ReactNode }
export type OrganizationContextType = {
  organizations: Organization[]
  setOrganizations: (organization: Organization[]) => void
  organizationView: Organization | null
  setOrganizationView: (organization: Organization) => void
  isLocked: boolean
  setIsLocked: (isLocked: boolean) => void
  toggleLocked: () => void
}
