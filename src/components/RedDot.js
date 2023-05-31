import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RedDot = () => {
  return (
    <View style={{position:'absolute',right:8,top:6,zIndex:999,backgroundColor:'red',height:7,width:7,borderRadius:5}}/>
  )
}

export default RedDot

const styles = StyleSheet.create({})