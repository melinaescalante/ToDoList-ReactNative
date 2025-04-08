import { useCallback, useEffect, useState } from 'react'
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { icons, images } from '../constants'
import * as Animatable from 'react-native-animatable'
import { formatDate } from '../functions/functions'
import EmptyState from './EmptyState'
import { Video, ResizeMode } from 'expo-av'
import { router } from 'expo-router'


const zoomOut = {
    0:
    {
        scale: 1.1
    },
    1:
    {
        scale: 0.9
    }
}
const zoomIn = {
    0:
    {
        scale: 0.9
    },
    1:
    {
        scale: 1.1
    }
}
const SoonerItemToExpire = ({ activeItem, item }) => {

    const [play, setPlay] = useState(false);


    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            <TouchableOpacity onPress={()=>{
               
                router.push(`/notes/${item.$id}`)}}>

                <View className='shadow-lg shadow-black'>

                    <View className='overflow-hidden flex-col border border-quaternary rounded-xl gap-2 p-4 w-52 max-h-lg h-72 mx-3 mb-3 pb-3'>
                        <Text className='text-xl text-senary font-pbold mb-3'>{item.title}</Text>
                        {
                            item.datelimit &&
                            (<Text className='font-psemibold text-tertiary mb-2'>{formatDate(item.datelimit)}</Text>)
                        }
                        {
                            item.description &&
                            (<Text className='font-pregular text-tertiary'>{item.description}</Text>)
                        }
                        {
                            item.image
                                ? (


                                    <Image className='mx-auto h-full w-full mb-6 max-w-36 opacity-80 pb-8' resizeMode='contain' source={{ uri: item.image }} />

                                ) : (
                                    play ? (

                                        <TouchableOpacity
                                            onPress={() => setPlay(true)}
                                            activeOpacity={0.7}
                                            className="w-auto h-auto max-w-lg max-h-lg rounded-xl mt-3 relative flex justify-center items-center"
                                        >
                                            <ImageBackground
                                                source={{ uri: item.thumbnail }}
                                                className="w-full h-full rounded-xl mt-3 opacity-75"
                                                resizeMode="cover"
                                            />
                                            <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                                        </TouchableOpacity>
                                    ) : (<Video
                                        source={{ uri: item.video }}
                                        shouldPlay={play}
                                        style={{ width: '100%', height: 200, borderRadius: 20 }}
                                        resizeMode={ResizeMode.CONTAIN}
                                        useNativeControls
                                        onPlaybackStatusUpdate={(status) => {
                                            if (status.didJustFinish) setPlay(false);
                                        }}
                                    />)
                                )

                        }
                    </View>
                </View>
            </TouchableOpacity>
        </Animatable.View>
    )
}
const HorizontalCarrusel = ({ notes }) => {


    const [activeItem, setActiveItem] = useState(notes[0])

    const viewabaleItemsChanged = (({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    })

    return (
        <FlatList
            className='py-6'
            onViewableItemsChanged={viewabaleItemsChanged}
            horizontal={notes && notes.length >= 1}
            data={notes}
            viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
            contentOffset={{ x: 0 }}
            keyExtractor={(note) => note.$id}

            ListEmptyComponent={() => (
                <EmptyState subtitle='No reminders that expires soon'></EmptyState>)}
            renderItem={({ item }) => (
                <SoonerItemToExpire item={item} activeItem={activeItem}></SoonerItemToExpire>)}

        />
    )
}

export default HorizontalCarrusel