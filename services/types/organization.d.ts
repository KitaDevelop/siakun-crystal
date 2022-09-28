type Organization = {
  id: number
  name: string
  profilePicture: string
}
type SelectOrganizationOption = { value: Organization; label: string }
type OrganizationProviderProps = { children: React.ReactNode }
type OrganizationContextType = {
  organizations: Organization[]
  setOrganizations: (organization: Organization[]) => void
  organizationView: Organization | null
  setOrganizationView: (organization: Organization) => void
  isLocked: boolean
  setIsLocked: (isLocked: boolean) => void
  toggleLocked: () => void
}
