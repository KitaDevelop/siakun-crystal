import React from 'react'

interface Props {
  idx: number
  no: string
  name: string
  desc: string
  jenis: string
  tipe: string
  saldo: string
}

export const AccountRow = ({ idx, no, name, desc, jenis, tipe, saldo }: Props) => {
  return (
    <tr className="text-center">
      <td>{idx}</td>
      <td>{no}</td>
      <td className="whitespace-normal text-left">{name}</td>
      <td className="text-left">{desc}</td>
      <td>{jenis}</td>
      <td>{tipe}</td>
      <td>{saldo}</td>
    </tr>
  )
}
