import React from 'react'
import Image from 'next/image'
import { FaSpinner } from 'react-icons/fa'
import { Loader } from './Loader'

export const FullPageLoader = () => {

  return (
    <div className="grid place-items-center h-screen">
      <Image
        src="/illust.svg"
        alt="illustration"
        className="absolute inset-0 object-cover object-center w-full z-[-1]"
        layout="fill"
        draggable={false}
      />
      <div className="flex flex-col items-center gap-2">
        <div className="card bg-white relative shadow-lg">
          <Loader />
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <Image src="/logo.png" alt="logo" width={80} height={46} />
      </div>
    </div>
  )
}
