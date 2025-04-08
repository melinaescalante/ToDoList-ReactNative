import { View, Text, TouchableOpacity, ImageBackground, Modal, Pressable, Alert } from 'react-native'
import React, {  useState } from 'react'
import { Image } from 'react-native'
import { icons } from '../constants'
import { formatDate } from '../functions/functions'
import { Video, ResizeMode } from 'expo-av'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from './CustomButton'
import { router, usePathname, } from 'expo-router'
import { deleteNote } from '../lib/appwrite'
import { useNavigation } from '@react-navigation/native'
const NoteCard = ({ note: { title, description, datelimit, thumbnail, image, video, $id }, onDeleted }) => {
    const [play, setPlay] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const pathname = usePathname();

    const remove = async () => {

        try {
            await deleteNote($id)
            setModalVisible(false)
            setModalDeleteVisible(false)
            if (pathname==='/my-notes' ||pathname==='/profile') {
                onDeleted()
                
            }else if (pathname==='/'){

            }
            Alert.alert('Success', 'The note was deleted successfuly.')

        } catch (error) {
            console.log(error)
        }
    }
    const update = () => {
        try {
            setModalVisible(false)
            router.push(`/notes/update/${$id}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View className='flex-col items-start px-4 border border-secondary p-2 py-4 rounded-lg m-2'>
            <View className='flex flex-row gap-3 items-start'>
                <View className='flex justify-center items-center flex-row flex-1'>

                    <View className='flex-1 flex-col '>
                        <Text className=' font-psemibold text-md text-quaternary' numberOfLines={1}>{title}</Text>
                    </View>
                </View>


                {/* Primer Modal - Settings */}
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <SafeAreaView className=" items-center justify-center h-full bg-black/40">
                        <View >
                            <View className="bg-tertiary pt-4 pb-4 min-w-72 px-4 rounded-xl">
                                <View className='flex-row  items-center justify-center border-b-2 py-2 border-b-secondary '>

                                    <Text className="text-xl font-psemibold text-center">Settings</Text>
                                    <Pressable className="relative left-20" onPress={() => setModalVisible(false)}>
                                        <Text className="font-pbold text-lg">X</Text>
                                    </Pressable>
                                </View>


                                <CustomButton
                                    icon={icons.pencil}
                                    handlePress={update}
                                    title="Update"

                                    textStyles='text-center'
                                    iconColor="#EF6C00"
                                    containerStyles="border w-full py-1 mt-4"
                                />

                                <Pressable
                                    onPress={() => {
                                        setModalVisible(false);
                                        setModalDeleteVisible(true);
                                    }}
                                    className="rounded-xl flex flex-row justify-center items-center border w-full py-1 mt-2"
                                >
                                    <Text className="text-xl text-center font-psemibold">Delete</Text>
                                    <View className=" ">
                                        <Image resizeMode="contain" source={icons.trash} className="h-6 w-6" />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>

                {/* Segundo Modal - Confirm Delete */}
                <Modal
                    animationType='fade'

                    transparent={true}
                    visible={modalDeleteVisible}
                    onRequestClose={() => setModalDeleteVisible(false)}
                >
                    <SafeAreaView className='flex items-center justify-center my auto h-full bg-black/40'>
                        <View >
                            <View className='bg-quaternary pt-4 pb-4 items-center justify-center min-h-56 min-w-72 gap-4  px-4 rounded-xl'>
                                <View className='flex-row  items-center justify-center border-b-2 py-2 border-b-primary '>
                                    <Text className='text-xl font-psemibold text-center'>You sure you want to erase this note?</Text>
                                    <Pressable
                                        className='relative -top-5'
                                        onPress={() => setModalDeleteVisible(!modalDeleteVisible)}>
                                        <Text className='font-pbold text-lg' >X</Text>
                                    </Pressable>
                                </View>

                                <Pressable
                                    onPress={() => remove()}
                                    className="rounded-xl flex-row justify-center items-center border w-full py-1 mt-2"
                                >
                                    <Text className="text-xl text-center font-psemibold">Yes, I want to delete it.</Text>
                                    <View className="relative left-16">
                                        <Image resizeMode="contain" source={icons.trash} className="h-6 w-6" />
                                    </View>
                                </Pressable>
                                <Pressable
                                    onPress={() => {
                                        setModalDeleteVisible(false);
                                        setModalVisible(false);
                                    }}
                                    className="rounded-xl flex-row justify-around items-center border w-full py-1 mt-2"
                                >
                                    <Text className="text-xl text-center font-psemibold">No, I dont want to delete it.</Text>



                                </Pressable>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>


                <Pressable
                    onPress={() => setModalVisible(true)}><Image source={icons.menu} className='w-6 h-6' resizeMode='contain'></Image></Pressable>

            </View>

            <View>
                {datelimit ? <Text className=' text-senary text-md mb-2'>Datelimit : <Text className='font-psemibold'>{formatDate(datelimit)}</Text></Text> : <Text className='text-senary  mb-2'>No datelimit</Text>}
            </View>
            <View  >
                {description && <Text className='text-senary leading-6  mb-2'>{description}</Text>}
            </View>
            <View className='w-full rounded-xl' >
                {image && (
                    <Image
                        source={{ uri: image }}
                        className="w-full h-48 rounded-xl mt-3 opacity-75"
                        resizeMode="cover"
                    />)

                }
                {video && (

                    play ? (
                        <Video
                            source={{ uri: video }}
                            shouldPlay={play}
                            style={{ width: '100%', height: 200, borderRadius: 20 }}
                            resizeMode={ResizeMode.CONTAIN}
                            useNativeControls
                            onPlaybackStatusUpdate={(status) => {
                                if (status.didJustFinish) setPlay(false);
                            }}
                        />
                    ) : (
                        <TouchableOpacity
                            onPress={() => setPlay(true)}
                            activeOpacity={0.7}
                            className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
                        >
                            <ImageBackground
                                source={{ uri: thumbnail }}
                                className="w-full h-full rounded-xl mt-3 opacity-75"
                                resizeMode="cover"
                            />
                            <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                        </TouchableOpacity>
                    )
                )

                }

            </View>
        </View>
    )
}

export default NoteCard