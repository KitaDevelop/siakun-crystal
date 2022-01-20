import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountName: {
    width: '60%',
    marginBottom: 6,
  },
  balance: {
    width: '20%',
    fontWeight: 'bold',
    textDecoration: 'underline',
    textAlign: 'center',
    marginBottom: 6,
  },
})

interface Props {
  year: number
}

const TableHeader = ({ year }: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.accountName}></Text>
      <Text style={styles.balance}>{year}</Text>
      <Text style={styles.balance}>{year - 1}</Text>
    </View>
  )
}

export default TableHeader
