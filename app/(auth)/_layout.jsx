import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='sign-in' options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name='sign-up' options={{ headerShown: false }}></Stack.Screen>
      </Stack>
      <StatusBar backgroundColor='#373F51' style='light' />

    </>
  )
}

export default AuthLayout