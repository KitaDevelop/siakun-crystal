import React, { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import useAuth from '@hooks/useAuth'
import { blobToBase64 } from '@utils/blobToBase64'
import { UpdateDisplayPicturePayload } from '@api/profile/endpoints'
import { useChangeDisplayPicture, useRemoveDisplayPicture } from '@api/profile'
import { downscaleImage } from '@utils/downscaleImage'
import { ROLE } from '@context/AuthContext/types'
import { capitalize } from '@utils/capitalize'

export const DisplayPicture = () => {
  const { userProfile, setUserProfile } = useAuth()
  const [avatarPreview, setPreview] = useState<string>()
  const avatarRef = useRef<HTMLInputElement>(null)

  const changeAvatar = useChangeDisplayPicture()
  const removeAvatar = useRemoveDisplayPicture()

  const onRemovePicture = async () => {
    removeAvatar.mutate(undefined, {
      onSuccess: () => {
        if (userProfile) setUserProfile({ ...userProfile, profilePicture: '' })
      },
    })
  }

  const chooseAvatar = () => avatarRef.current?.click()

  const onAvatarChosen = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const file = files?.item(0)

    if (files && file) {
      let dataUrl = (await blobToBase64(file)) as string
      dataUrl = await downscaleImage(dataUrl, file.type, 112, 0.9)

      const payload: UpdateDisplayPicturePayload = {
        profilePicture: dataUrl,
      }
      changeAvatar.mutate(payload, {
        onSuccess: () => {
          setPreview(dataUrl)
          if (userProfile) setUserProfile({ ...userProfile, profilePicture: dataUrl })
        },
      })
    }
  }

  const displayPictureSrc = avatarPreview ? avatarPreview : userProfile?.profilePicture || '/avatar-placeholder.png'
  const displayName = userProfile?.role === ROLE.AUDITOR ? userProfile.username : userProfile?.organization.name

  return (
    <div className="card bg-base-200 p-8 flex-row shadow-md items-center col-span-2">
      <div className="avatar">
        <div className="rounded-full w-28 h-28">
          <Image alt="avatar" src={displayPictureSrc} width={112} height={112} />
        </div>
      </div>
      <div className="flex-1 flex flex-col ml-8">
        <div className="text-2xl font-bold mb-2">{capitalize(displayName!)}</div>
        <div className="flex">
          <input type="file" className="hidden" accept="image/*" ref={avatarRef} onChange={(e) => onAvatarChosen(e)} />
          <div className="btn btn-primary font-bold" onClick={() => chooseAvatar()}>
            Change Display Picture
          </div>
          <div className="btn btn-ghost text-primary font-bold" onClick={() => onRemovePicture()}>
            Remove Picture
          </div>
        </div>
      </div>
    </div>
  )
}
