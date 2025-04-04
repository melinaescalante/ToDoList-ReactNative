import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, {  useState } from 'react'
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';
const SearchInput = ({initialQuery}) => {
    const pathName = usePathname()

    const [query, setQuery] = useState(initialQuery||'')
    
    const startSearch = () => {
        if (query==='') {
            return Alert.alert('Error', 'Please input something to start search your notes.')
        }
    

        if (pathName.startsWith('/search')) {

            router.setParams(query)
            router.push(`/search/${query}`)

        } else {
            router.push(`/search/${query}`)
        }
    }
    return (

        <View
            className=" mt-2 flex-row w-full bg-[#2A2F3C] h-16  border-2 border-[#262932] px-4   focus:border-quaternary items-center rounded-2xl" >
            <TextInput
                className="flex-1 mt-0.5 text-senary font-psemibold text-base"
                value={query}
                placeholder='Search your notes'
                onChangeText={(e) => {setQuery(e)}}
                placeholderTextColor="#CDCDE0"
                onSubmitEditing={() => {
                    startSearch()
                }}
            ></TextInput>
            <TouchableOpacity
                onPress={() => {
                    startSearch()

                }}
            >
                <Image className='w-6 h-6 ' resizeMode='contain' source={icons.search}></Image>
            </TouchableOpacity>
        </View>

    )

}
export default SearchInput