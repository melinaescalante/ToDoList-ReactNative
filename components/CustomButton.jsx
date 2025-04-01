import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={handlePress} 
        className={` justify-center items-center ${containerStyles} ${ isLoading ?'opacity-50':''} `} disabled={isLoading} style={{ height: '62px', padding: 8, borderRadius: 10 }}>
            <Text className={`text-xl font-psemibold ${textStyles} `}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton