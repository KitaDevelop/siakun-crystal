import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'
import TableRow from './TableRow'
import { TrialBalanceRow } from '@context/TrialBalanceContext/types'
import TableHeader from './TableHeader'

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

interface Props {
  data: TrialBalanceRow[]
  year: number
}

const ItemsTable = ({ data, year }: Props) => (
  <View style={styles.tableContainer}>
    <TableHeader year={year} />
    <TableRow items={data} />
  </View>
)

export default ItemsTable
