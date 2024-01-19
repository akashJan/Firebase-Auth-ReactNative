/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Image } from 'react-native';
import { useState } from 'react';

import { StackActions, useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import database from '@react-native-firebase/database';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {

        try {
            if (email.length > 0 && password.length > 0) {

                const user = await auth().signInWithEmailAndPassword(email, password);
                console.log(user);

                // For First time login verification
                // const userDoc = await firestore().collection('users').doc(user.uid).get();

                // if (!userDoc.exists || !userDoc.data().verified) {
                //     // User is verified for the first time
                //     Alert.alert('You are verified');
                //     navigation.dispatch(StackActions.replace('Home'));

                //     // Update verification status in Firestore
                //     await firestore().collection('users').doc(user.uid).set({ verified: true });
                // } else {
                //     // User has been verified before, no need to show alert
                //     // Redirect to Home or any other screen as needed
                //     Alert.alert('Please verify your email.\n Check your email Inbox \n for a verification link.');

                //     // await auth().currentUser.sendEmailVerification();
                //     await auth().signOut();
                // }

                if (user.user.emailVerified) {
                    Alert.alert('You are  verifed');
                    navigation.dispatch(StackActions.replace('Home'));
                } else {
                    Alert.alert('Please verify your email.\n Check your email Inbox \n for a verification link.');

                    // await auth().currentUser.sendEmailVerification();
                    await auth().signOut();
                }

                // setMessage('');

                // navigation.navigate('Home', {
                //     email: isUserLogin.user.email,
                //     password: isUserLogin.user.password,
                // });
            }
            else {
                Alert.alert('Please Enter: All Data');
            }
        } catch (error) {
            console.log(error);
            setMessage(error.message);
        }

    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />

            <View style={{ flexDirection: 'row', width: '100%', zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image src={'https://solidstudio.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Flofvu8al%2Fproduction%2Faabfcf1734f9e1e4379f4f80042bdf11e2e57dbf-420x308.png&w=1080&q=75'} style={{ width: 150, height: 200 }} />

                <Image src={'https://cdn.dribbble.com/users/528264/screenshots/3140440/media/5f34fd1aa2ebfaf2cd548bafeb021c8f.png'} style={{ width: 150, height: 200 }} />
            </View>

            <View>

                <Text style={styles.headingText}>
                    Login
                </Text>

                <TouchableOpacity style={styles.sign} onPress={() => {
                    navigation.navigate('SignUp');
                }}>
                    <Text >Don't have Account<Text style={{ color: 'blue' }}>  Register ?</Text>
                    </Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter email"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />

                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.addButton} onPress={() => handleLogin()}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Login</Text>
                </TouchableOpacity>
                <Text>{message}</Text>
            </View>


        </View>
    );
}

const { width } = Dimensions.get('screen');  //Takes Full Screen

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 50 },
    headingText: { textAlign: 'left', fontSize: 20, fontWeight: 'bold', marginVertical: 10, marginLeft: 4 },
    inputBox: { width: width - 30, marginVertical: 10, padding: 10, borderColor: '#FAEF9B', outline: 'none', borderBottomWidth: 2, marginHorizontal: 6 },
    addButton: { backgroundColor: '#FF9843', marginVertical: 10, paddingVertical: 15, borderRadius: 50, marginHorizontal: 20 },
    sign: { alignItems: 'textAlign', fontWeight: 'bold', marginBottom: 10, marginLeft: 4 },
});
