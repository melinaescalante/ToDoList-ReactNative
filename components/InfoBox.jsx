import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, subtitle,titleStyles,containerStyles}) => {
  return (
    <View className={`${containerStyles} justify-center items-center`}>
      <Text className={`${titleStyles} flex-col flex`}>
        {title}

      </Text>
        <Text className='text-gray-100 text-sm '>{subtitle}</Text>
    </View>
  )
}

export default InfoBox