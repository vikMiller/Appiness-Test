import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    ToastAndroid,
    Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { emailRegex, Employees } from '../../constants/data';

import Ripple from 'react-native-material-ripple';
import { GRADIENT, PRIMARY_COLOR } from '../../constants/styles';
import { connect } from 'react-redux';
import { addList } from '../../store/actions/employees';

const credentrials = {
    username: 'hruday@gmail.com',
    password: 'hruday123'
}

const Login = ({ navigation, addList }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    React.useEffect(() => setDataToRedux(), [])

    const setDataToRedux = () => {
        addList(Employees)
    }

    const textInputChange = (val) => {
        if (emailRegex.test(String(val).toLowerCase())) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (emailRegex.test(String(val).toLowerCase())) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {

        if (!emailRegex.test(String(userName).toLowerCase())) {
            ToastAndroid.showWithGravityAndOffset(
                "Enter valid Username.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return;
        }

        if (userName !== credentrials.username) {
            ToastAndroid.showWithGravityAndOffset(
                "Username does not match.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return;
        }

        if (password.length < 8) {
            ToastAndroid.showWithGravityAndOffset(
                "Password length should not be less then 8 characters.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return;
        }

        if (password !== credentrials.password) {
            ToastAndroid.showWithGravityAndOffset(
                "Password does not match.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return;
        }

        navigation.reset({
            routes: [{ name: 'EmployeeList' }]
        });
    }

    return (
        <Animated.View style={styles.container}>
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome to Appiness!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Enter valid Email Id</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }

                <Ripple onPress={() => loginHandle(data.username, data.password)} style={styles.button} rippleColor={PRIMARY_COLOR}>
                    <LinearGradient
                        colors={GRADIENT}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>Log In</Text>
                    </LinearGradient>
                </Ripple>
            </Animatable.View>
        </Animated.View>
    );
};

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addList: (data) => dispatch(addList(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});