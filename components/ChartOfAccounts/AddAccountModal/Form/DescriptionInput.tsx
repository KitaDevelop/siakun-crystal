import { Textarea } from '@components/Form'
import React from 'react'
import { Controller } from 'react-hook-form'
import { AccountInputProps } from '..'

export const DescriptionInput = ({ control }: AccountInputProps) => {
  return (
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <Textarea label="Description" placeholder="Enter Description" {...field} />
      )}
    />
  )
}
