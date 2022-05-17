import Image from 'next/image'
import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export const Loader = () => {
  return (
    <div className="flex items-center relative p-16">
      <div className="absolute top-9 left-1/2 -translate-x-1/2">
        <FaSpinner className="w-24 h-24 animate-spin text-primary" />
      </div>
      <div className="relative mx-2 pt-1">
        <Image width={25} height={35} src="/logo_icon_only.png" alt="logo" className="self-center" />
      </div>
    </div>
  )
}