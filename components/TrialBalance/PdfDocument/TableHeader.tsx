import React, { Fragment } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { TrialBalanceRow } from '@context/TrialBalanceContext/types'
import { CURRENT_YEAR } from '@constants/.'

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

const TableHeader = () => {
  return (
    <View style={styles.row}>
      <Text style={styles.accountName}></Text>
      <Text style={styles.balance}>{CURRENT_YEAR}</Text>
      <Text style={styles.balance}>{CURRENT_YEAR - 1}</Text>
    </View>
  )
}

export default TableHeader
