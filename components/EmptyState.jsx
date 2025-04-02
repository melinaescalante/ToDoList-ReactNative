import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className='justify-center items-center px-4'>
            <Text className='font-pmedium text-lg text-gray-300'>
               {title}
            </Text>
            <Text className='font-psemibold mt-2 text-2xl text-white'>
                {subtitle}
            </Text>
            <Image source={images.catchUp} resizeMode='contain' className=' opacity-90  m-3 mt-6 h-40'></Image>
            <CustomButton title='Create a note' handlePress={()=>router.push('/create')} containerStyles={'w-full my-5 bg-quaternary text-white py-3 '} textStyles={'text-primary py-2.5'}></CustomButton>
        </View>
    )
}

export default EmptyState