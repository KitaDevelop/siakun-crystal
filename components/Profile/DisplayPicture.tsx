import React from 'react'
import Image from 'next/image'
import useAuth from '@hooks/useAuth'

interface Props {}

export const DisplayPicture = (props: Props) => {
  const { userProfile } = useAuth()

  const onRemovePicture = () => {}

  return (
    <div className="card bg-base-200 p-8 flex-row shadow-md items-center col-span-2">
      <div className="avatar">
        <div className="rounded-full w-28 h-28">
          <Image alt="avatar" src={userProfile?.profilePicture || '/avatar-placeholder.png'} width={112} height={112} />
        </div>
      </div>
      <div className="flex-1 flex flex-col ml-8">
        <div className="text-2xl font-bold mb-2">{userProfile?.organization_name}</div>
        <div className="flex">
          <div className="btn btn-primary font-bold">Change Display Picture</div>
          <div className="btn btn-ghost text-primary font-bold">Remove Picture</div>
        </div>
      </div>
    </div>
  )
}
