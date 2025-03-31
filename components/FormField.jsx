import { View, Text, TextInput, TouchableOpacity , Image} from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
const FormField = ({ title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className={`text-senary space-y-2 ${otherStyles}`}>
            <Text className='text-senary font-pmedium mb-2' >{title}</Text>
            <View className=" mt-2 flex-row w-full bg-[#2A2F3C] h-16  border-2 border-[#5C6884] px-4   focus:border-quaternary items-center rounded-2xl" >
                <TextInput className="flex-1 text-senary font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}></TextInput>
                    {title==='Password'&&(<TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                        <Image source={!showPassword? icons.eye:icons.eyeHide} className='h-6 w-6' resizeMode='contain'></Image>
                    </TouchableOpacity>)}
            </View>
        </View>
    )

}
export default FormField