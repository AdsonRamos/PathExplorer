import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { shapes } from '../../shapes/shapes'
import { styles } from '../../styles/styles'

export default function AStarPreScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Text style={{ paddingRight: 20 }}>Largura do grid:</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={shapes.triangleLeft}></TouchableOpacity>
                    <Text style={{ paddingLeft: 20, paddingRight: 20 }}>10</Text>
                    <TouchableOpacity style={shapes.triangleRight}></TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 30 }}>
                <View>
                    <Text style={{ paddingRight: 20 }}>Altura do grid:</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                    <TouchableOpacity style={shapes.triangleLeft}></TouchableOpacity>
                    <Text style={{ paddingLeft: 20, paddingRight: 20 }}>10</Text>
                    <TouchableOpacity style={shapes.triangleRight}></TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={{ paddingTop: 250 }}>
                <Text>Ok</Text>
            </TouchableOpacity>
        </View>
    )
}