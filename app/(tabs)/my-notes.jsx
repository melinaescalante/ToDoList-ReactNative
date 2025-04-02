import { View, Text, ScrollView, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import HorizontalCarrusel from '../../components/HorizontalCarrusel'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllNotes } from '../../lib/appwrite'
import NoteCard from '../../components/NoteCard'
const MyNotes = () => {
  const { data: notes, refetch } = useAppwrite(getAllNotes)
  notes.forEach(note => {
    
    console.log(note.users.avatar)
  });
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
        data={[]}

        renderItem={({ item }) => 
          (<NoteCard 
          note={item}
           creator={item.users}
            ></NoteCard>
        )}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View
            className='my-6 px-4 space-y-6'>
            <View
              className='justify-between items-start flex-row mb-4'>
              <View
                className='gap-2'>
                <Text className='font-pmedium text-lg text-gray-300'>
                  Welcome to your notes,
                </Text>
                <Text className='font-psemibold text-3xl text-white'>
                  Melina
                </Text>
              </View>
            </View>
            <SearchInput></SearchInput>
            <View
              className='w-full flex-1 pt-5 pb-8'>
              <Text
                className='font-pregular text-senary mb-3'>Latest Notes</Text>
              <HorizontalCarrusel
                notes={[{ id: 1 }, { id: 2 }] ?? []}>

              </HorizontalCarrusel>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="You're all catch up" subtitle='No reminders that expire soon'></EmptyState>)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
      />

    </SafeAreaView>
  )
}

export default MyNotes