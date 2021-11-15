import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Table, TableBody, TableHeader } from '@components/Table'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Trial Balance') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const TBPage = (props: Props) => {
  return (
    <Layout navbarProps={meta}>
      ini trial balance
      <div>
        ini header trial balance
        <Table zebra>
          <TableHeader trialBalance />
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="text-center">
                <td>1-1111</td>
                <td className="whitespace-normal text-left">Ini nama akun yang rada panjaaaang</td>
                <td>Rp999.999.999</td>
                <td>Rp999.999.999</td>
                <td>Rp999.999.999</td>
                <td>Rp0</td>
                <td>Rp999.999.999</td>
                <td>Rp999.999.999</td>
                <td>Rp999.999.999</td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

export default TBPage
