import { View, Text, Image } from 'react-native'
import React from 'react'
import {  Tabs } from 'expo-router'
import { icons } from '../../constants'
const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className=" items-center 
    text-center gap-1 mt-7 flex-nowrap ">
            <Image resizeMode='contain'
                source={icon}
                tintColor={color}
                className={`${focused ? " w-8 h-8" : "w-7 h-7 "}  `}
            ></Image>
            <Text className={`${focused ? "font-pbold" : "font-pregular "} text-xs  `}
                style={{ color: color, flexWrap: 'nowrap' , width:'100%'}}>{name}</Text>
        </View>
    )
}
const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{ tabBarShowLabel: false, tabBarStyle: { height: 90, alignItems: 'center', justifyContent: 'flex-center', backgroundColor:'#ffffff', } , tabBarActiveTintColor:'#DAA49A', tabBarInactiveTintColor:'#373F51', }}>
                <Tabs.Screen
                    name="my-notes"
                    options={{
                        title: "Notes",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.notes}
                                color={color}
                                name="Notes"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs></>
    )
}

export default TabsLayout