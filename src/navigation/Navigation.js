import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import EmployeeList from '../screens/EmployeeList';
import { connect } from 'react-redux';
import EmpDetails from '../screens/EmpDetails';

const Stack = createStackNavigator();

export function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName='Login'>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="EmployeeList"
                component={EmployeeList}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="EmpDetails"
                component={EmpDetails}
            />
        </Stack.Navigator>
    );
}

class Navigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps, {})(Navigation)
