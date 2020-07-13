import React from 'react'
import { WebView } from 'react-native-webview'
import useAsyncData from '@livelybone/use-async-data'
import { ArticleItem, Msg } from '@/api/Msg'
import ArticleTemplate, {
  injectedJavaScript,
} from '@/views/utils/ArticleTemplate'
import useMounted from '@livelybone/use-mounted'
import CAlert from '@components/CAlert'

const Article: React.FC<ScreenProps> = () => {
  const [info, getInfo] = useAsyncData(
    () =>
      Msg.detail(global.route.params?.id).then(res => {
        // global.navigation.setOptions({ title: res.title })
        return res
      }),
    null as null | ArticleItem,
    CAlert,
  )

  useMounted(() => {
    getInfo()
  })

  return (
    <WebView
      style={{ flex: 1 }}
      originWhitelist={['*']}
      source={{
        html: ArticleTemplate,
      }}
      injectedJavaScript={injectedJavaScript(info)}
    />
  )
}

export default Article
