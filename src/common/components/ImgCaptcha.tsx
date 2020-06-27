import useAsyncData from '@livelybone/use-async-data'
import { Captcha } from '@/api/Capcha'
import CAlert from '@components/CAlert'
import useMounted from '@livelybone/use-mounted'
import { Image, TouchableOpacity } from 'react-native'
import CText from '@components/CText'
import React from 'react'

const ImgCaptcha: React.FC<{ uri: string; refresh(): void }> = ({
  uri,
  refresh,
}) => {
  return (
    <TouchableOpacity onPress={() => refresh?.()}>
      {uri ? (
        <Image source={{ uri }} style={{ width: 76, height: 31 }} />
      ) : (
        <CText style={{ width: 76, height: 31 }}>...fetching</CText>
      )}
    </TouchableOpacity>
  )
}

export default ImgCaptcha

export function useImgCaptcha() {
  const source = useAsyncData(Captcha.img, { uri: '', id: '' }, e =>
    CAlert(`图片验证码获取失败：${e.message}`),
  )

  useMounted(() => {
    source.getData()
  })

  return source
}
