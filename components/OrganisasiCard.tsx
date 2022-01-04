import React from 'react'
import Image from 'next/image'

interface Props {
  id: number
}

export const OrganisasiCard = ({ id }: Props) => {
  const colors = gradients[id % gradients.length]
  return (
    <div
      className="card p-6 grid place-items-center"
      style={{ background: `linear-gradient(109.27deg, ${colors[0]} 0.74%, ${colors[1]} 100%)` }}
    >
      <div className="avatar">
        <div className="mb-2 rounded-full w-24 h-24">
          <Image alt="organisasi" src="/avatar-placeholder.png" width={96} height={96} />
        </div>
      </div>
      <div className="uppercase font-bold text-white">nama organisasi</div>
    </div>
  )
}

const gradients = [
  ['#00C9FF', '#92FE9D'],
  ['#4B6CB7', '#441848'],
  ['#C04848', '#480048'],
  ['#FFC226', '#80AF0B'],
  ['#D53369', '#DAAE51'],
  ['#FAC9B8', '#EF5247'],
  ['#3CA55C', '#B5AC49'],
  ['#F09819', '#EDDE5D'],
  ['#085078', '#85D8CE'],
  ['#22C1C3', '#FDBB2D'],
  ['#47F1D3', '#1992AC'],
  ['#F46693', '#A232C7'],
]
