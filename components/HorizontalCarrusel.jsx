import { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { images } from '../constants'
import * as Animatable from 'react-native-animatable'
import { typeOfURL } from './NoteCard'
import { formatDate } from '../functions/functions'
import EmptyState from './EmptyState'
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
    const [urlType, setUrlType] = useState('')

    const [play, setPlay] = useState(false);
    useEffect(() => {
        const type = async () => {

            const typeUrl = await typeOfURL(item.image)
            setUrlType(typeUrl)
            console.log(typeUrl)
        }
        type()
    }, [])


    return (
        <Animatable.View
            className='mr-5'
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            <TouchableOpacity className='shadow-lg shadow-black'>

                <View className='overflow-hidden flex-col border border-quaternary rounded-xl gap-2 p-4 w-52 h-72 mx-3'>
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
                        && (
                            urlType.includes('image') ? (
                              <Image className='w-10 h-20  opacity-80' resizeMode='contain'  source={ images.camera } />
                            ) : (
                              <Image style={{borderRadius:30}} resizeMode='contain' className='w-10 h-20 opacity-80' source={images.video} />
                            )
                          )
                    }
                </View>
            </TouchableOpacity>
        </Animatable.View>
    )
}
const HorizontalCarrusel = ({ notes }) => {
    const [activeItem, setActiveItem] = useState(notes[1])
    const viewabaleItemsChanged = (({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    })
    return (
        <FlatList
            className='py-6'
            onViewableItemsChanged={viewabaleItemsChanged}
            horizontal
            data={notes}
            viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
            contentOffset={{ x: 170 }}
            keyExtractor={(note) => note.$id}
            renderItem={({ item }) => (
                <SoonerItemToExpire item={item} activeItem={activeItem}></SoonerItemToExpire>)}
                ListEmptyComponent={() => (
                    <EmptyState  subtitle='No reminders that expires soon'></EmptyState>)}
        />
    )
}

export default HorizontalCarrusel