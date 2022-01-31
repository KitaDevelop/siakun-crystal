import React from 'react'
import { ChangePassword } from './ChangePassword'
import { DisplayPicture } from './DisplayPicture'

interface Props {}

export const Profile = (props: Props) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <DisplayPicture />
      <ChangePassword />
    </div>
  )
}

export default Profile
