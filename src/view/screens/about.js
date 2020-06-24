import React from 'react';
import { View, Text } from 'react-native'
import { styles } from '../styles/styles'

export default function About() {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>About Screen</Text>
        </View>
    )
}