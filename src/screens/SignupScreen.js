/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { useState } from 'react';
import { View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (email.length > 0 && password.length > 0 && name.length > 0) {

        const response = await auth().createUserWithEmailAndPassword(email, password);

        const userData = {
          id: response.user.uid,
          name: name,
          email: email,
        };
        try {
          await firestore()
            .collection('users')
            .doc(response.user.uid)
            .set(userData);

          console.log('User added!');
        } catch (error) {
          console.error('Error adding user to Firestore:', error);
        }


        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
        Alert.alert('Plese verify your email checkout link in your Inbox');
        navigation.navigate('Login');

        // console.log(isUserCreated);
        // setMessage('');
      } else {
        Alert.alert('Please Enter: \n Email-ID and Password');
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
          Signup
        </Text>

        <TouchableOpacity style={styles.login} onPress={() => {
          navigation.navigate('Login');
        }}>
          <Text style={styles.login}>Already Have Account ?
            <Text style={{ color: 'blue' }}> Login</Text>
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.inputBox}
          placeholder="Enter Name"
          value={name}
          onChangeText={(value) => setName(value)}
        />
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

        <TouchableOpacity style={styles.addButton} onPress={() => handleSignup()}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>SignUp
          </Text>
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
  login: { alignItems: 'textAlign', fontWeight: 'bold', marginBottom: 10, marginLeft: 4 },
});
