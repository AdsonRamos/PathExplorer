import React from 'react';
import { View, Text, Button } from 'react-native'
import { styles } from '../styles/styles'

export default function Home({navigation}) {

    const pressHandler = () => {
        navigation.navigate('AStar')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Home Screen</Text>
            <Button title='go to a* simulator' onPress={pressHandler}></Button>
        </View>
    )
}