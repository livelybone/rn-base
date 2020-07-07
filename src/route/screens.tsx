import React from 'react'
import { gntRoute } from '@/route/gntRoute'
import Scan from '@components/Scan'
import UserMsgList from '@/views/UserMsgList'
import CButton from '@components/CButton'
import SizeVariable from '@styles/SizeVariable'
import ColorVariable from '@styles/ColorVariable'
import { Msg } from '@/api/Msg'
import ForgetPwd from '@/views/ForgetPwd'
import SignUp from '@/views/SignUp'
import SignIn from '@/views/SignIn'
import Article from '@/views/Article'
import Home from '@/views/Home'

export default {
  Home: gntRoute(
    Home,
    {
      // ...headerDark,
      title: 'Home',
      headerLeft: () => <></>,
      headerRight: () => (
        <Scan
          color={ColorVariable.font}
          onSuccess={({ data }) => {
            console.log(data)
          }}
        />
      ),
      animationEnabled: false,
    },
    {
      headerBgTransition: [
        [0, 300],
        { color: '#ffffff00', pos: 0 },
        { color: '#ffffffff', pos: 1 },
      ],
    },
  ),
  SignIn: gntRoute(
    SignIn,
    {
      title: '',
      animationEnabled: false,
    },
    {
      containerBgColor: ColorVariable.white,
      headerShadowDisabled: true,
    },
  ),
  SignUp: gntRoute(
    SignUp,
    {
      title: '',
    },
    {
      formData: {},
      containerBgColor: ColorVariable.white,
      headerShadowDisabled: true,
    },
  ),
  ForgetPwd: gntRoute(
    ForgetPwd,
    {
      title: '',
    },
    {
      formData: {},
      containerBgColor: ColorVariable.white,
      headerShadowDisabled: true,
    },
  ),
  UserMsgList: gntRoute(
    UserMsgList,
    {
      title: '消息中心',
      headerRight: () => (
        <CButton
          borderColor="transparent"
          padding={`0 ${SizeVariable.padding}`}
          color={ColorVariable.fontLight}
          bgColor="transparent"
          style={{
            height: 44,
            fontSize: SizeVariable.fontSubContent,
          }}
          onPress={() => Msg.markAllRead()}
        >
          全部已读
        </CButton>
      ),
      animationEnabled: false,
    },
    { noScroll: true },
  ),
  Article: gntRoute(
    Article,
    {
      title: '',
    },
    {
      id: '' as number | string,
      noScroll: true,
      headerShadowDisabled: true,
    },
  ),
}
