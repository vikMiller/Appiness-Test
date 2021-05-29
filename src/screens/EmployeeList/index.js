import React from 'react'
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import { connect } from 'react-redux';

const WIDTH = Dimensions.get("window").width;

import { AVATAR, ITEM_SIZE, PRIMARY_COLOR, SPACING } from '../../constants/styles';

const EmployeeList = ({ navigation, employees }) => {
    const scrollY = React.useRef(new Animated.Value(0)).current

    const onItemPress = (item) => {
        navigation.navigate('EmpDetails', {
            item: item
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Image
                source={require('../../assets/bg-image.jpg')}
                style={{ height: '100%', width: WIDTH, position: 'absolute' }}
                blurRadius={80}
            />
            <Animated.FlatList
                data={employees}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatlistContainer}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2)
                    ]

                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 1)
                    ]

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })

                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0]
                    })

                    return (

                        <Animated.View style={{ opacity, transform: [{ scale }] }}>
                            <Ripple onPress={() => onItemPress(item)} style={styles.listContainer} rippleColor={PRIMARY_COLOR}>
                                <Image
                                    source={{ uri: 'https://image.flaticon.com/icons/png/512/168/168726.png' }}
                                    style={styles.avatar}
                                />
                                <View >
                                    <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
                                    <Text style={{ fontSize: 16, opacity: .7 }}>{item.phoneNo}</Text>
                                    <Text style={{ fontSize: 12, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
                                </View>
                            </Ripple>
                        </Animated.View>
                    )
                }}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps, {})(EmployeeList)

const styles = StyleSheet.create({
    flatlistContainer: {
        padding: SPACING,
        paddingTop: StatusBar.currentHeight || 42
    },
    listContainer: {
        flexDirection: 'row',
        padding: SPACING,
        marginBottom: SPACING,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 5,
    },
    avatar: {
        width: AVATAR,
        height: AVATAR,
        borderRadius: AVATAR,
        marginRight: SPACING / 2
    }
})