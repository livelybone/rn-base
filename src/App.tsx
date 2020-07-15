import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Provider } from 'react-redux'
import ModalSignIn from '@components/ModalSignIn'
import ModalUnavailable from '@components/ModalUnavailable'
import { Camera, CameraRefProps } from '@components/Scanner'
import { Screens } from '@/route'
import { store } from '@/store'
import { MSG } from '@models/msg'
import Modal from '@components/Modal'
import { NavigationContainer } from '@react-navigation/native'

declare global {
  interface Global {
    modalSignIn: Modal
    modalUnavailable: Modal
    Camera: CameraRefProps
  }
}

const App = () => {
  useEffect(() => {
    store.dispatch({ type: MSG.INIT_MSG_LIST })
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Screens style={styles.navigation} />
        <ModalSignIn
          modalRef={ref => {
            global.modalSignIn = ref
          }}
        />
        <ModalUnavailable
          modalRef={ref => {
            global.modalUnavailable = ref
          }}
        />
        <Camera
          ref={ref => {
            global.Camera = ref!
          }}
        />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  navigation: {
    flex: 1,
  },
})

export default App
