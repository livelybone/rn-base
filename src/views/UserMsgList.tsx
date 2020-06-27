import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import CText from '@components/CText'
import ListEmpty from '@components/ListEmpty'
import ColorVariable from '@styles/ColorVariable'
import CommonStyles from '@styles/CommonStyles'
import SizeVariable from '@styles/SizeVariable'
import { dateFormatter } from '@utils/Formatters'
import { MSG } from '@models/msg'
import { useReduxDispatch } from '@auraxy/redux-usage'

const UserMsgList: React.FC<ScreenProps> = ({ onScroll }) => {
  const list = useSelector(state => {
    return state.msg?.msgList || []
  })

  const dispatch = useReduxDispatch()

  return (
    <FlatList
      onScroll={onScroll}
      style={{
        flex: 1,
        backgroundColor: ColorVariable.white,
        paddingHorizontal: SizeVariable.padding,
      }}
      data={list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            paddingVertical: 17,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: ColorVariable.tableBorder,
          }}
          onPress={() => dispatch(MSG.MAKE_MSG_READ, item)}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  ...CommonStyles.dot,
                  marginTop: 4,
                  backgroundColor: item.isRead
                    ? ColorVariable.fontLighter
                    : ColorVariable.main,
                }}
              />
              <CText
                fontSize={16}
                fontWeight="600"
                color={
                  item.isRead ? ColorVariable.fontLight : ColorVariable.font
                }
              >
                {item.title}
              </CText>
            </View>
            <CText fontSize={12} color={ColorVariable.fontLight}>
              {dateFormatter(item.createTime)}
            </CText>
          </View>
          <CText margin="10 0 0" color={ColorVariable.fontLight}>
            {item.content}
          </CText>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => `${index}`}
      ListEmptyComponent={<ListEmpty />}
    />
  )
}

export default UserMsgList
