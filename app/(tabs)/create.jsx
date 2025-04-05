import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { createNote } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const Create = () => {
  const [uploading, setUploading] = useState(false)
  const { user, setUser } = useGlobalContext()
  const [image, setImage] = useState(false)
  const [imageOrVideo, setImageOrVideo] = useState(null)
  const [form, setForm] = useState({
    title: '',
    datelimit: null,
    thumbnail: null,
    image: null,
    description: null
  })
  const openPicker = async (selectType) => {
console.log(image)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    })
    console.log(result)
    if (!result.canceled) {
      if (image === true) {
        setForm({ ...form, image: result.assets[0] })
        return
      }
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (selectType === 'video') {
        setForm({ ...form, image: result.assets[0] })
      }
    }
  }

  const submit = async () => {
    if (form.title === '' || (!form.thumbnail && form.image)) {
      return Alert.alert('Please fill all the fields.')
    }
    setUploading(true)
    try {


      let noti = await createNote({ ...form, userId: user.$id })
      console.log(noti)
      Alert.alert('Succes', 'Note created successfuly.')

      router.push('/my-notes')
    } catch (error) {
      return Alert.alert('Error', error.message)
    } finally {
      setForm({
        title: '',
        datelimit: null,
        thumbnail: null,
        image: null,
        description: null
      })
      setUploading(false)
      setImage(false)
      setImageOrVideo(null)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>

        <Text className='text-2xl text-senary font-psemibold my-6'>Create a note</Text>
        <FormField
          otherStyles='mb-2'
          handleChangeText={(e) => setForm({ ...form, title: e })} placeholder=''
          title='Note title:'
          value={form.title} />
        <FormField
          otherStyles='mb-2'

          handleChangeText={(e) => setForm({ ...form, description: e })}
          title='Description:'
          value={form.description} />
        <FormField
          otherStyles='mb-2'

          title='Datelimit:'
          value={form.datelimit} />
        {
          imageOrVideo === null && (

            <View className='flex-col justify-around w-full  my-6'>
              <Text className='text-senary  font-pmedium mb-2'>Choose what you what to add to your note.</Text>
              <View className=' justify-around w-full flex-row'>

                <CustomButton containerStyles='bg-tertiary m-1 flex-1' title='Image' handlePress={(() => { setImageOrVideo('Image') })}>

                </CustomButton>
                <CustomButton handlePress={(() => { setImageOrVideo('Video'), setForm({ ...form, image: null }) })} title='Video' containerStyles='flex-1 m-1 bg-tertiary'>

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
            setImage(true);
              }}>

              {form.image && image ? (
                <Image
                  source={{ uri: form.image.uri }}
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
               setImage(false); })}></CustomButton>
          </>
        ) : imageOrVideo === 'Video' && (
          <>
            <Text
              className='text-senary mb-2 font-pmedium'>
              Upload video:
            </Text>
            <TouchableOpacity onPress={() => openPicker('video')}>
              {form.image ? (
                <Video
                  source={{ uri: form.image.uri }}
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
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
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
        <CustomButton isLoading={uploading} title='Create note'
          textStyles='text-primary ' containerStyles=' my-2 py-3 w-full bg-quaternary' handlePress={submit}></CustomButton>
      </ScrollView>
    </SafeAreaView >
  )
}

export default Create