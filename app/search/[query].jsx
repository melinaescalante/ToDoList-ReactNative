import { View, Text, FlatList} from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { searchNotes } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import NoteCard from '../../components/NoteCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'

const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: searchedNotes, refetch } = useAppwrite(()=>searchNotes(query))

  useEffect(() => {
    refetch()
  }, [query])
  return (
    <SafeAreaView className='justify-center bg-primary h-full'>
      <FlatList
        className='text-senary my-auto'
        data={searchedNotes}

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
                  Search Result,
                </Text>
                <Text className='font-psemibold text-3xl text-white'>
                  {query}
                </Text>
              </View>
            </View>
            <SearchInput initialQuery={query} refetch={refetch}></SearchInput>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState subtitle="You have no notes about that topic!" title='Create one!' ></EmptyState>)}
      
      />

    </SafeAreaView>
  )
}

export default Search