import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'


const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, icon, iconColor, }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePress}
            className={`flex-row justify-center items-center ${icon ? 'space-x-4 ' : ''} ${containerStyles} ${isLoading ? 'opacity-50' : ''} `} disabled={isLoading} style={{ height: '62px', padding: 8, borderRadius: 10 }}>
            <Text className={`text-xl text-center font-psemibold ${textStyles} `}>{title}</Text>
            {icon && (
                <View className='relative '>
                    <Image resizeMode='contain' tintColor={iconColor} source={icon} className='h-6 w-6' />
                </View>
            )}
        </TouchableOpacity>
    )
}

export default CustomButton