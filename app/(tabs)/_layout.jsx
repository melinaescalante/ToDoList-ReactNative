import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { icons } from '../../constants/icons'
const TabIcon = ({ icon, color, focused, name }) => {
    return (
        <View>
            <Image
                source={icon}
            ></Image>
        </View>
    )
}
const TabsLayout = () => {
    return (
        <>
            <Tabs>
                <Tabs.Screen name='my-notes' options={{ title: 'My Notes', headerShown: false, tabBarIcon: ({ color, focused }) => (<TabIcon name='My Notes' focused={focused} color={color} icon={icons.notes}></TabIcon>) }}>
                </Tabs.Screen>
                  
                <Tabs.Screen name='create' options={{ title: 'Create Note', headerShown: false, tabBarIcon: ({ color, focused }) => (<TabIcon name='Create Note' focused={focused} color={color} icon={icons.plus}></TabIcon>) }}>
                </Tabs.Screen>

                <Tabs.Screen name='profile' options={{ title: 'Profile', headerShown: false, tabBarIcon: ({ color, focused }) => (<TabIcon name='Profile' focused={focused} color={color} icon={icons.profile}></TabIcon>) }}>
                </Tabs.Screen>
            </Tabs></>
    )
}

export default TabsLayout