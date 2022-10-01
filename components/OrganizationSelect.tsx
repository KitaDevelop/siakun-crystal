import { useOrganization } from '@hooks/useOrganization'
import { isSelectOrganizationOption } from '@utils/isSelectOptionValid'
import React from 'react'
import Select from 'react-select'
import { customStyles } from './Form'

export const OrganizationSelect = () => {
  const { organizations, organizationView, setOrganizationView } = useOrganization()
  const organizationOptions = organizations.map((org: Organization) => ({
    value: org,
    label: org.name,
  }))
  const chosenOrganization = organizationOptions.find(
    (x: SelectOrganizationOption) => x.value == organizationView
  )

  return (
    <Select
      className="flex-1"
      options={organizationOptions}
      onChange={(v) => {
        if (isSelectOrganizationOption(v)) {
          setOrganizationView(v.value)
        }
      }}
      placeholder="Select organization"
      value={chosenOrganization}
      styles={customStyles}
      closeMenuOnSelect
      isSearchable
    />
  )
}
