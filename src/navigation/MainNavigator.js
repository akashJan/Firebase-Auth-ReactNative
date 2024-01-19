import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Importing screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;
