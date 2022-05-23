import React from 'react'
import { OrganizationContext } from '@context/OrganizationContext/OrganizationProvider'

export function useOrganization() {
  const context = React.useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error(
      'useOrganization must be used within a OrganizationProvider'
    )
  }
  return context
}
