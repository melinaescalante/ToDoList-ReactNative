import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full h-full px-4 '>
          <View>
            <Text className=' text-quaternary font-pbold text-3xl  ms-1 mb-6 text-center ' >ToDoList</Text>

          </View>
          <Text className="text-2xl text-senary font-psemibold text-center">Log In</Text>
          <Image source={images.signUp} className='mx-auto mt-16 h-80  ' resizeMode='contain'></Image>
          <FormField title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"></FormField>
          <FormField title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"></FormField>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn