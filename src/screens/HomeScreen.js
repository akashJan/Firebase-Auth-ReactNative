/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Email:{Auth().currentUser.email}</Text>
            <Text>UID:{Auth().currentUser.uid}</Text>

            <TouchableOpacity style={{
                width: '80%', marginVertical: 20, backgroundColor: '#FF9843', color: '#fff', alignItems: 'center',
                padding: 10, borderRadius: 20,
            }} onPress={async () => {
                try {
                    await Auth().signOut();
                    // navigation.navigate(StackActions.replace('Login'));
                    navigation.navigate('Login');
                } catch (error) {
                    console.log(error);
                }
                // navigation.navigate('Login');
            }}>
                <Text>
                    Logout
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default HomeScreen;
