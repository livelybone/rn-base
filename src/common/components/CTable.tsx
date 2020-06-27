import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import { calcMargin } from '@utils/Styles'
import { RenderNode } from './CText'
import ListEmpty from './ListEmpty'

const styles = StyleSheet.create({
  tr: {
    flexDirection: 'row',
    width: '100%',
  },
})

export interface Column<T = any> {
  th: V_FnV<ReactNode, [Column<T>, number]>
  td(rowData: T, it: Column<T>, i: number): ReactNode
  thStyle?: V_FnV<any, [{ isLastRow: boolean; isLastColumn: boolean }]>
  tdStyle?: V_FnV<any, [{ isLastRow: boolean; isLastColumn: boolean }]>
}

function calcStyle(
  styleFn?: Column['thStyle'],
  isLastRow = false,
  isLastColumn = false,
) {
  return StyleSheet.create({
    style: styleFn ? styleFn({ isLastRow, isLastColumn }) : {},
  }).style
}

interface Props {
  columns: Column[]
  data: any[]
  isColumn?: string
  margin?: string
}

const CTable: React.FC<Props> = ({ columns, data, isColumn, margin }) => {
  const marginStyle = calcMargin(margin)
  return (
    <View style={{ ...marginStyle }}>
      {!isColumn ? (
        <>
          <View style={styles.tr}>
            {columns.map((column, i) => {
              const th =
                typeof column.th === 'function'
                  ? column.th(column, i)
                  : column.th
              const style = calcStyle(
                column.thStyle,
                false,
                i === columns.length - 1,
              )
              return (
                <View style={style} key={i}>
                  {RenderNode(th, style)}
                </View>
              )
            })}
          </View>
          {data.length > 0 ? (
            data.map((item, i) => (
              <View style={styles.tr} key={i}>
                {columns.map((column, j) => {
                  const td = column.td(item, column, i)
                  const sParams = [
                    i === data.length - 1,
                    j === columns.length - 1,
                  ]
                  const style = {
                    ...calcStyle(column.thStyle, ...sParams),
                    ...calcStyle(column.tdStyle, ...sParams),
                  }
                  return (
                    <View style={style} key={j}>
                      {RenderNode(td, style)}
                    </View>
                  )
                })}
              </View>
            ))
          ) : (
            <ListEmpty
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderColor: ColorVariable.tableBorder,
              }}
            />
          )}
        </>
      ) : (
        <>
          {columns.map((column, i) => {
            const th =
              typeof column.th === 'function' ? column.th(column, i) : column.th
            const isLastRow = i === columns.length - 1
            const style = calcStyle(column.thStyle, isLastRow)
            return (
              <View style={styles.tr} key={i}>
                <View style={style}>{RenderNode(th, style)}</View>
                {data.map((item, j) => {
                  const td = column.td(item, column, j)
                  const sParams = [isLastRow, j === data.length - 1]
                  const $style = {
                    ...calcStyle(column.thStyle, ...sParams),
                    ...calcStyle(column.tdStyle, ...sParams),
                  }
                  return (
                    <View style={$style} key={j}>
                      {RenderNode(td, $style)}
                    </View>
                  )
                })}
              </View>
            )
          })}
        </>
      )}
    </View>
  )
}

export default CTable
