import React, { Fragment } from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { numberToRupiah } from '@utils/numberToRupiah'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    fontWeight: 'bold',
    marginTop: 10,
  },
  accountName: {
    width: '70%',
  },
  balance: {
    width: '15%',
    textAlign: 'right',
  },
})

interface Props {
  items: TrialBalanceRow[]
}

const TableRow = ({ items }: Props) => {
  const rows = items.map((item) => {
    const { type, content } = item
    if (type === 'Header')
      return (
        <View style={styles.row} key={item.id}>
          <Text style={styles.header}>{item.content}</Text>
        </View>
      )
    else {
      const balanceContent = content as BalanceRow
      return (
        <View style={styles.row} key={item.id}>
          <Text style={styles.accountName}>{balanceContent.accountName}</Text>
          <Text style={styles.balance}>{numberToRupiah(balanceContent.adjustedBalance)}</Text>
          <Text style={styles.balance}>{numberToRupiah(balanceContent.startBalance)}</Text>
        </View>
      )
    }
  })
  return <Fragment>{rows}</Fragment>
}

export default TableRow
