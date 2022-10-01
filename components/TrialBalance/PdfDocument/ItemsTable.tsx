import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer'
import TableRow from './TableRow'
import TableHeader from './TableHeader'
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

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default ItemsTable
