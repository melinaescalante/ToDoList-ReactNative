import { View, Text, ScrollView, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import HorizontalCarrusel from '../../components/HorizontalCarrusel'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllNotes, getNotesAboutToExpire } from '../../lib/appwrite'
import NoteCard from '../../components/NoteCard'
import { useGlobalContext } from '../../context/GlobalProvider'
const MyNotes = () => {
  const { user, setUser, setIsLogged } = useGlobalContext()

  const { data: notes, refetch } = useAppwrite(() => getAllNotes(user.$id))
  const { data: notesAboutToExpire } = useAppwrite(() => getNotesAboutToExpire(user.$id))
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  return (
    <SafeAreaView className='justify-center bg-primary h-full'>
      <FlatList
        className='text-senary'
        data={notes??[]}

        renderItem={({ item }) =>
        (<NoteCard
          note={item}
          creator={item.users}
        ></NoteCard>
        )}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View
            className='my-3 px-4 space-y-6'>
            <View
              className='justify-between items-start flex-row mb-4'>
              <View
                className='gap-2'>
                <Text className='font-pmedium text-lg text-gray-300'>
                  Welcome to your notes,
                </Text>
                <Text className='font-psemibold text-3xl text-white'>
                  {user?.username}
                </Text>
              </View>
            </View>
            <SearchInput></SearchInput>
            {
              notesAboutToExpire && (

                <View
                  className='w-full flex-1 pt-5 pb-8'>
                  <Text
                    className='font-pregular text-senary mb-3'>Latest Notes</Text>
                  <HorizontalCarrusel
                    notes={notesAboutToExpire ?? []}>

                  </HorizontalCarrusel>
                </View>
              )
            }
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="You're all catch up" subtitle='No reminders'></EmptyState>)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
      />

    </SafeAreaView>
  )
}

export default MyNotes