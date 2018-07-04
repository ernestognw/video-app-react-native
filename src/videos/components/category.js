import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

function Category(props) {
  return (
    <ImageBackground
      style={styles.wrapper}
      source={{
        uri: props.background_image
      }}
    >
    {
      props.genres ?
      <Text style={styles.genre}>
       {props.genres[0]}
      </Text> :
      <Text style={styles.genre}> 
        Undefined
      </Text>
    }
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
 wrapper: {
  width: 250,
  height: 100,
  borderRadius: 10,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
 },
 genre: {
  color: 'white',
  fontSize: 30,
  fontWeight: 'bold',
  textShadowColor: 'rgba(0, 0, 0, .75)',
  textShadowOffset: {
    width: 2,
    height: 2
  },
  textShadowRadius: 0,
 }
})

export default Category;