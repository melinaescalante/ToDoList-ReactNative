import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import "../global.css"
const App = () => {
  return (
    <View style={styles.container}>
      <Text className='text-2xl font-pblack '>App</Text>
      <Link href='/my-notes' className='text-cyan-600 text-3xl underline'>Go to home</Link>
    </View>
  )
}

export default App

const styles = StyleSheet.create({container:{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}})