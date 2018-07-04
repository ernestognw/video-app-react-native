import React from 'react';
import { View, StyleSheet } from 'react-native';

function LoaderLayout (props) {
  return(
    <View  style={styles.overlay}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoaderLayout;