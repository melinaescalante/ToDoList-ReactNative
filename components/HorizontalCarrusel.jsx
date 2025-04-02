import { View, Text, FlatList } from 'react-native'
import React from 'react'

const HorizontalCarrusel = ({ notes }) => {
    return (
        <FlatList horizontal 
        data={notes} keyExtractor={(note) => note.$id} 
        renderItem={({ item }) => (
        <Text classname='text-senary'>{item.id}
        </Text>)}></FlatList>
    )
}

export default HorizontalCarrusel