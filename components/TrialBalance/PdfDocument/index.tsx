import React from 'react'
import { Page, Document, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import ItemsTable from './ItemsTable'
import { TrialBalanceRow } from '@context/TrialBalanceContext/types'

interface Props {
  financialPosition: TrialBalanceRow[]
  activities: TrialBalanceRow[]
  year: number
}

Font.register({
  family: 'garamond',
  fonts: [
    { src: '/EBGaramond-Regular.ttf' },
    { src: '/EBGaramond-Bold.ttf', fontWeight: 'bold' },
    { src: '/EBGaramond-Medium.ttf', fontWeight: 'medium' },
  ],
})

const styles = StyleSheet.create({
  page: {
    paddingVertical: 32,
    paddingHorizontal: 44,
    fontSize: 11,
    flexDirection: 'column',
    fontFamily: 'garamond',
  },
  section: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 11,
    fontWeight: 'bold',
  },
})

export const PDFDocument = ({ financialPosition, activities, year }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.section}>I. Statement of Financial Position</Text>
        <ItemsTable data={financialPosition} year={year} />
        <Text style={styles.section}>II. Statement of Activities</Text>
        <ItemsTable data={activities} year={year} />
      </Page>
    </Document>
  )
}

export default PDFDocument
