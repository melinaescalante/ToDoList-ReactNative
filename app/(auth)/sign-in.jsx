import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { signIn } from '../../lib/appwrite'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all the fields.')
    }
    setIsSubmitting(true)
    try {
      const result = await signIn(form)
      router.push('/notes')
    } catch (error) {
      Alert.alert('Error', error.message || 'An unexpected error occurred.');


    } finally {
      setIsSubmitting(false)

    }
  }
  return (
    <SafeAreaView className='bg-primary justify-center h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 '>
          <View>
            <Link href='/' className='text-quaternary font-pbold text-3xl  mb-6 text-start ' >ToDoList</Link>

          </View>
          <Text className="text-2xl text-senary font-psemibold text-start mb-2">Log In</Text>
          <Image source={images.signUp} className='mx-auto mt-12 h-64  ' resizeMode='contain'></Image>
         <FormField title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            placeholder='name@domin.com'
            keyboardType='email-address'
            ></FormField>
          <FormField title="Password"
            keyboardType='default'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7 "></FormField> 
           <CustomButton isLoading={isSubmitting} title='Log In' handlePress={submit} containerStyles='bg-secondary mt-8 py-4 mb-8'></CustomButton>
          <View className='justify-center flex-row gap-2 items-center'>
            <Text 
            className='text-senary text-lg'>Don't have an account?</Text>
            <Link 
            className='font-psemibold text-lg text-quaternary' 
            href='/sign-up'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignIn