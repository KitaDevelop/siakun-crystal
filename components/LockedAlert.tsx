import { useOrganization } from '@hooks/useOrganization'
import React, { useState } from 'react'
import { BiLock, BiLockOpen } from 'react-icons/bi'
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

export const LockedToggleAlert = () => {
  const { isLocked, toggleLocked } = useOrganization()

  return (
    <div className="alert bg-yellow-200 text-yellow-800">
      <div className="flex items-center gap-4 font-medium">
        {isLocked ? (
          <>
            <BiLock className="w-5 h-5" />
            <span>This report is locked. You may unlock to allow the organization to edit.</span>
          </>
        ) : (
          <>
            <BiLockOpen className="w-5 h-5" />
            <span>This report is <u>not</u> locked. The organization is allowed to edit.</span>
          </>
        )}
      </div>
      <div onClick={toggleLocked} className="btn btn-sm">
        {isLocked ? (
          <><BiLockOpen className="w-5 h-5 mr-1" /> unlock</>
        ) : (
          <><BiLock className="w-5 h-5 mr-1" /> lock</>
        )}
      </div>
    </div>
  )
}