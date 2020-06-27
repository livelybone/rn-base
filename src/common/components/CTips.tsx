import React from 'react'
import { View } from 'react-native'
import ColorVariable from '@styles/ColorVariable'
import CommonStyles from '@styles/CommonStyles'
import SizeVariable from '@styles/SizeVariable'
import CText from './CText'

interface Props {
  title: string
  tips: string[]
}

const CTips: React.FC<Props> = ({ title, tips }) => {
  return (
    <View
      style={{
        padding: 20,
        marginHorizontal: SizeVariable.padding,
        backgroundColor: ColorVariable.bg,
      }}
    >
      <CText fontSize={14}>{title}</CText>
      {tips.map((tip, i) => (
        <View style={{ flexDirection: 'row', marginTop: 12 }} key={i}>
          <View style={{ ...CommonStyles.dot, marginTop: 4 }} />
          <CText
            fontSize={12}
            color={ColorVariable.fontLight}
            style={{ flex: 1 }}
          >
            {tip}
          </CText>
        </View>
      ))}
    </View>
  )
}

export default CTips
