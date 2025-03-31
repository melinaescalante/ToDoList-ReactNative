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
            <View className=" mt-2 flex-row w-full h-16 border-2 px-4 focus:border-secondary items-center rounded-2xl" style={{ height: 60, width: 'auto', borderRadius: 15, backgroundColor: '#2A2F3C', borderColor: '#5C6884', borderWidth: 1, marginTop: 8 }}>
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