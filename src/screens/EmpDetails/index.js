import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SPACING, TEXT_FONTWEIGHT } from '../../constants/styles'
import Feather from 'react-native-vector-icons/Feather';

const EmpDetails = ({ navigation, route }) => {
    const { item } = route.params

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Image
                source={{ uri: 'https://image.flaticon.com/icons/png/512/168/168726.png' }}
                style={{ height: '45%' }}
            />
            <TouchableOpacity onPress={() => goBack()} style={{ padding: SPACING - 5, position: 'absolute' }}>
                <Feather
                    name="arrow-left"
                    color="#000"
                    size={30}
                />
            </TouchableOpacity>
            <View style={{ padding: SPACING, flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: TEXT_FONTWEIGHT }}>{item.name}</Text>
                <Text style={styles.subText}>Email: <Text style={{ fontWeight: TEXT_FONTWEIGHT }}>{item.email}</Text></Text>
                <Text style={styles.subText}>Phone No.: <Text style={{ fontWeight: TEXT_FONTWEIGHT }}>{item.phoneNo}</Text></Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={[styles.subText, { width: 150 }]}>Age: <Text style={{ fontWeight: TEXT_FONTWEIGHT }}>{item.age}</Text></Text>
                    <Text style={styles.subText}>Gender: <Text style={{ fontWeight: TEXT_FONTWEIGHT }}>{item.gender}</Text></Text>
                </View>
            </View>
        </View>
    )
}

export default EmpDetails

const styles = StyleSheet.create({
    subText: {
        fontSize: 16,
        opacity: .7,
        paddingVertical: 10
    }
})