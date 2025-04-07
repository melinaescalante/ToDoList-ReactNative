import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import {  searchNoteById, updateNote } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const Update = () => {
  const { query } = useLocalSearchParams()
  const [note, setNote] = useState({
    title: '',
    datelimit: null,
    thumbnail: null,
    video: null,
    image: null,
    description: null
  })

  const [imageOrVideo, setImageOrVideo] = useState(null)
  useEffect(() => {
    const bringNote = async () => {

      const result = await searchNoteById(query)
      if (result) {

        setNote({
          title: result[0].title,
          description: result[0].description,
          datelimit: result[0]?.datelimit,
          image: result[0]?.image,
          video: result[0]?.video,
          thumbnail: result[0]?.thumbnail,
          id: result[0].$id
        })
        if (result[0]?.image) {
          setImageOrVideo('Image')
        } else if (result[0]?.video && result[0]?.thumbnail) {
          setImageOrVideo('Video')
        }

      }
    }
    bringNote()
  }, [])

  const [uploading, setUploading] = useState(false)
  const { user, setUser } = useGlobalContext()

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.canceled) {
      if (imageOrVideo === 'Image') {
        setNote({ ...note, image: result.assets[0] })  // Solo imagen (sin thumbnail)
      }
      if (imageOrVideo === 'Video') {
        if (selectType === 'video') {
          setNote({ ...note, video: result.assets[0] })
        }
        if (selectType === 'image') {
          setNote({ ...note, thumbnail: result.assets[0] })
        }
      }
    }
  }

  const submit = async () => {
    if (note.title === '') {
      return Alert.alert('Please fill all the fields.')
    }

    if (imageOrVideo === 'Video' && (!note.video || !note.thumbnail)) {
      return Alert.alert('Please select both a video and a thumbnail.')
    }

    if (imageOrVideo === 'Image' && !note.image) {
      return Alert.alert('Please select an image.')
    }

    setUploading(true)
    try {
      await updateNote({...note})

      Alert.alert('Succes', 'Note updated successfuly.')

      router.replace('/my-notes')
    } catch (error) {
      return Alert.alert('Error', error.message)
    } finally {
      setNote({
        title: '',
        datelimit: null,
        thumbnail: null,
        image: null,
        video: null,
        description: null
      })
      setUploading(false)
      setImageOrVideo(null)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>

        <Text className='text-2xl text-senary font-psemibold my-6'>Update note</Text>
        <FormField
          otherStyles='mb-2'
          handleChangeText={(e) => setNote({ ...note, title: e })} placeholder=''
          title='Note title:'
          value={note.title} />
        <FormField
          otherStyles='mb-2'

          handleChangeText={(e) => setNote({ ...note, description: e })}
          title='Description:'
          value={note.description} />
        <FormField
          otherStyles='mb-2'

          title='Datelimit:'
          value={note.datelimit} />
        {
          imageOrVideo === null && (

            <View className='flex-col justify-around w-full  my-6'>
              <Text className='text-senary  font-pmedium mb-2'>Choose what you what to add to your note.</Text>
              <View className=' justify-around w-full flex-row'>

                <CustomButton containerStyles='bg-tertiary m-1 flex-1' title='Image' handlePress={(() => { setImageOrVideo('Image') })}>

                </CustomButton>
                <CustomButton handlePress={(() => { setImageOrVideo('Video'), setNote({ ...note, image: null }) })} title='Video' containerStyles='flex-1 m-1 bg-tertiary'>

                </CustomButton>
              </View>
            </View>
          )
        }
        {imageOrVideo === 'Image' ? (
          <>
            <Text className='text-senary my-2 font-pmedium'>Image:</Text>
            <TouchableOpacity onPress={() => {
              openPicker('image');

            }}>

              {note.image ? (
                <Image
                  source={{ uri: note.image }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                />

              ) : (
                <>
                  <View
                    className='w-full h-16 gap-2 px-4 bg-black/40 rounded-xl justify-center items-center flex-row'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='h-5 w-5'>

                    </Image>
                    <Text className='text-senary'>Choose a file</Text>
                  </View>
                </>

              )}
            </TouchableOpacity>
            <CustomButton containerStyles='bg-tertiary m-1 w-[50%] my-2' textStyles='text-xs' title='Change to video' handlePress={(() => {
              setImageOrVideo('Video');

            })}></CustomButton>
          </>
        ) : imageOrVideo === 'Video' && (
          <>
            <Text
              className='text-senary mb-2 font-pmedium'>
              Upload video:
            </Text>
            <TouchableOpacity onPress={() => openPicker('video')}>
              {note.video ? (
                <Video
                  source={{ uri: note.video }}
                  style={{ width: '100%', height: 200, borderRadius: 20 }}
                  className="w-full h-64 rounded-2xl"
                  // useNativeControls
                  resizeMode={ResizeMode.COVER}
                // isLooping={true}
                />
              ) : (
                <View
                  className='w-full h-40 bg-black/40 rounded-xl justify-center items-center'>
                  <View
                    className='w-14 h-14 border border-tertiary border-dashed justify-center items-center'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='h-1/2 w-1/2'>

                    </Image>
                  </View>
                </View>)}
            </TouchableOpacity>
            <Text className='text-senary my-2 font-pmedium'>Thumbnail:</Text>
            <TouchableOpacity onPress={() => openPicker('image')}>
              {note.thumbnail ? (
                <Image
                  source={{ uri: note.thumbnail }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                />
              ) : (

                <View
                  className='w-full h-16 px-4 bg-black/40 rounded-xl justify-center items-center flex-row gap-2'>

                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='h-5 w-5'>

                  </Image>
                  <Text className='text-senary'>Choose a file</Text>
                </View>
              )}
            </TouchableOpacity>
            <CustomButton
              containerStyles='bg-tertiary m-1 w-[50%] my-2' title='Change to image'
              textStyles='text-xs'
              handlePress={(() => { setImageOrVideo('Image') })}></CustomButton>


          </>
        )}
        <CustomButton isLoading={uploading} title={uploading ? 'Updating note...' : 'Update note'}
          textStyles='text-primary ' containerStyles=' my-2 py-3 w-full bg-quaternary' handlePress={submit}></CustomButton>
      </ScrollView>
    </SafeAreaView >
  )
}

export default Update