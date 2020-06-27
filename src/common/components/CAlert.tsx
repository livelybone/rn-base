import { Alert } from 'react-native'

export default function CAlert(message?: string | { message: string }) {
  const msg =
    message && (typeof message === 'object' ? message.message : message)
  return new Promise<void>(res => {
    if (msg) {
      Alert.alert('', msg, [{ text: '确定', onPress: () => res() }])
    } else {
      res()
    }
  })
}
