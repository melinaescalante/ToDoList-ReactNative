import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { icons } from '../constants'
import { formatDate } from '../functions/functions'

const NoteCard = ({ note: { title, description, datelimit, thumbnail, image, Created, users: { username, avatar } } }) => {
    // const [first, setfirst] = useState(second)
    return (
        <View className='flex-col items-start px-4 mb-6 border border-secondary p-2 py-4 rounded-lg m-2'>
            <View className='flex flex-row gap-3 items-start'>
                <View className='flex justify-center items-center flex-row flex-1'>
                    {/* <View className=' w-12  h-12 rounded-lg  border-secondary justify-center items-center p-0.5 '>
                        <Image resizeMode='cover' source={{ uri: avatar }} className='w-full h-full rounded-lg'></Image>
                    </View> */}
                    <View className='flex-1 flex-col '>
                        <Text className=' font-psemibold text-md text-quaternary' numberOfLines={1}>{title}</Text>
                        {/* <Text className='text-sm  font-pregular text-gray-300' numberOfLines={1}>{username}</Text> */}
                    </View>
                </View>
                <View className='pt-2 my-auto'>
                    <Image source={icons.menu} className='w-6 h-6' resizeMode='contain'></Image>

                </View>
            </View>

            <View>
                {datelimit ? <Text className=' text-senary text-md mb-2'>Datelimit : <Text className='font-psemibold'>{formatDate(datelimit)}</Text></Text>:<Text className='text-senary  mb-2'>No datelimit</Text>}
            </View>
            <View  >
                {description && <Text className='text-senary leading-6  mb-2'>{description}</Text>}
            </View>
            <View className='w-full' >
                {image && <Image className='max-h-min' height={170} source={{uri:image}} resizeMode='cover' />}
            </View>
        </View>
    )
}

export default NoteCard