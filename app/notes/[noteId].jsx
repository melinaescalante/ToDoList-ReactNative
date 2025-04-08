import { View, Text, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { searchNoteById } from '../../lib/appwrite'
import NoteCard from '../../components/NoteCard'
import useAppwrite from '../../lib/useAppwrite'
import {  } from 'react-native-web'

const note = () => {
    const { noteId } = useLocalSearchParams()
    const [noteFound, setNoteFound] = useState({
        title: '',
        datelimit: null,
        thumbnail: null,
        video: null,
        image: null,
        description: null
    })
    useEffect(() => {
        const bringNote = async () => {

            const result = await searchNoteById(noteId)
            if (result) {
                setNoteFound({
                    title: result[0].title,
                    description: result[0].description,
                    datelimit: result[0]?.datelimit,
                    image: result[0]?.image,
                    video: result[0]?.video,
                    thumbnail: result[0]?.thumbnail,
                    id: result[0].$id

                })
                console.log(noteFound)
            }
        }
        bringNote()
    }, [])

    if (!noteId) <Redirect href='/my-note' />

    return (
        <SafeAreaView className='justify-center bg-primary h-full'>
        <ScrollView className='px-2'> 

            <Text className='text-2xl text-senary font-psemibold my-6 px-3'>Note detail</Text>
                        <NoteCard
                note={noteFound}
                
                ></NoteCard>
                </ScrollView>
        </SafeAreaView>
    )
}

export default note