import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'
const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = () => { createUser()}
  return (
    <SafeAreaView className='bg-primary justify-center h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 '>
          <View>
            <Link href='/' className='text-quaternary font-pbold text-3xl  mb-6 text-start ' >ToDoList</Link>

          </View>
          <Text className="text-2xl text-senary font-psemibold text-start mb-2">Sign Up</Text>
          {/* <Image source={images.signUp} className='mx-auto mt-12 h-64  ' resizeMode='contain'></Image> */}

          <FormField title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            // placeholder='name@domin.com'
           ></FormField><FormField title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              placeholder='name@domin.com'
              keyboardType="email-address"></FormField>
          <FormField title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7 "></FormField>
          <CustomButton isLoading={isSubmitting} title='Sign Up' handlePress={submit} containerStyles='bg-secondary mt-8 py-4 mb-8'></CustomButton>
          <View className='justify-center flex-row gap-2 items-center'>
            <Text className='text-senary text-lg'>Do you have an account?</Text>
            <Link className='font-psemibold text-lg text-quaternary' href='/sign-in'>Log In</Link>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignUp