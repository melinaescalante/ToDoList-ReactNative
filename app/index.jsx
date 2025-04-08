import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { images } from '../constants'
import {  Redirect, router } from 'expo-router'
import "../global.css"
import CustomButton from '../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/GlobalProvider'
// import 'react-native-url-polyfill/auto'
export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/my-notes" />;
  return (
    <SafeAreaView
      className='bg-primary h-full'>
      <ScrollView
        contentContainerStyle={{ height: '100%' }}>
        <View
          className='w-full min-h-[85vh]  items-center my-auto max-h-full justify-center px-4'>

          <Text className=' text-quaternary font-pbold text-3xl ps-1 ' style={{ marginBottom: 50 }}>ToDoList</Text>
          <Image source={images.todolist} resizeMode='contain' className="h-80  inset-shadow-sm inset-shadow-blue-500" ></Image>

          <View className='relative mt-5'>
            <Text className='text-center font-psemibold text-senary  text-2xl  py-2 rounded-lg px-4'>Start Managing Your Tasks with The Best
              <Text className='text-quaternary font-pbold '> ToDoList
              </Text>
            </Text>
            <Image
              source={images.path}
              resizeMode='contain'
              className='right-9 h-[15px] absolute -bottom-1 ' tintColor='#DAA49A' >

            </Image>
          </View>

          <Text
            className=' mt-7 text-senary text-center text-xl'
            style={{ margin: '20' }}>Where your organization begins  </Text>
          <CustomButton
            title='Continue with email'
            handlePress={() => router.push("/sign-in")} containerStyles='w-full mt-7 min-h-[62px] bg-secondary'>

          </CustomButton>


        </View>
      </ScrollView>
      <StatusBar backgroundColor='#373F51' style='light' />
    </SafeAreaView>
  )
}


