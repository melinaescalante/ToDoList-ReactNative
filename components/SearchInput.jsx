import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
const SearchInput = ({ title,
    value,
    
    handleChangeText,
    otherStyles,
    keyboardType
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      
            <View 
            className=" mt-2 flex-row w-full bg-[#2A2F3C] h-16  border-2 border-[#262932] px-4   focus:border-quaternary items-center rounded-2xl" >
                <TextInput
                    className="flex-1 mt-0.5 text-senary font-psemibold text-base"
                    keyboardType={keyboardType}
                    value={value}
                    placeholder='Search your notes'
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    ></TextInput>
                <TouchableOpacity>
                    <Image className='w-6 h-6 ' resizeMode='contain' source={icons.search}></Image>
                </TouchableOpacity>
            </View>
        
    )

}
export default SearchInput