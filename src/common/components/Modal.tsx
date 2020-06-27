import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import SizeVariable from '@styles/SizeVariable'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/Env'

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.75)',
  },
  modal: {
    position: 'relative',
    top: -50,
    maxWidth: SCREEN_WIDTH - SizeVariable.padding * 2,
    maxHeight: SCREEN_HEIGHT - SizeVariable.padding * 2,
  },
})

class Modal extends Component<any> {
  state = {
    visible: false,
  }

  bgClick = () => {
    if (!this.props.disableBgClick) {
      this.setState({ visible: false })
    }
  }

  render() {
    return this.state.visible ? (
      <View style={styles.overlay}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touch}
          onPress={this.bgClick}
        />
        <View style={styles.modal}>{this.props.children}</View>
      </View>
    ) : (
      <></>
    )
  }
}

export default Modal
