import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoaderLayout from '../../sections/components/loader-layout';

function Layout (props) {
  return (
    <View style={styles.container}>
      <View style={styles.video}> 
        {props.video}
      </View>
      <LoaderLayout>
        {
          props.loading &&
          props.loader
        }
      </LoaderLayout>
      {props.controls}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '56.25%',
  },
  video: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
})

export default Layout;