import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { getAllNotes, SignOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import NoteCard from '../../components/NoteCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'
const Search = () => {

  const { user, setUser, setIsLogged } = useGlobalContext()
  const { data: notes } = useAppwrite(() => getAllNotes(user.$id))
  const logout = async () => {
    await SignOut()
    setUser(null)
    setIsLogged(false)
    router.replace('/sign-in')
   }
  return (
    <SafeAreaView className='justify-center bg-primary h-full'>
      <FlatList
        className='text-senary my-auto'
        data={notes}

        renderItem={({ item }) =>
        (<NoteCard
          note={item}
          creator={item.users}
        ></NoteCard>
        )}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View
            className='w-full justify-center items-center pt-6 mb-10 px-4'>
            <TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
              <Image source={icons.logout} resizeMode='contain' className='w-6 h-6'></Image>
            </TouchableOpacity>
            <View className='w-16  border-tertiary border-2 h-16 justify-center items-center rounded-xl'>
              <Image source={{ uri: user?.avatar }} className='w-full h-full rounded-lg' resizeMode='cover'></Image>
            </View>
            <InfoBox title={user?.username} titleStyles='text-2xl text-senary font-pbold' containerStyles='mt-8' ></InfoBox>
            <View className='flex-row '>
              <InfoBox subtitle='Notes' title={notes?.length || 0} titleStyles='text-xl font-psemibold text-senary' ></InfoBox>
              {/* <InfoBox title={user?.username} titleStyles='text-xl text-senary' containerStyles='mt-5' ></InfoBox> */}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState subtitle="You have no notes !" title='Create one!' ></EmptyState>)}

      />

    </SafeAreaView>
  )
}

export default Search