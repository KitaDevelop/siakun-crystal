import React from 'react'
import { ImInfo } from 'react-icons/im'

export const LockedAlert = () => {
  return (
    <div className="alert bg-yellow-200 text-yellow-800">
      <div className="flex items-center gap-4 font-medium">
        <ImInfo className="w-5 h-5" />
        <span>This page is read-only. Ask your auditor for permission to edit.</span>
      </div>
    </div>
  )
}
