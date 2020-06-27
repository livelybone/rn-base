import { Alert } from 'react-native'

export default function CModalConfirm({
  title,
  message,
}: {
  title: string
  message?: string
}) {
  return new Promise((res, rej) => {
    Alert.alert(title, message, [
      { text: '取消', onPress: rej },
      { text: '确定', onPress: res },
    ])
  })
}
