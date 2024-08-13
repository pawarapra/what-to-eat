import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Image } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (userId.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both ID and password');
      return;
    }
 
    console.log('Logging in with ID:', userId, 'and password:', password);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.pic}>
        <Image style={styles.titleImage} source={require('../assets/icon.png')} />
      </View>
      <View style={styles.containertext}>
        <View>
          <Text h2>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="ID"
            onChangeText={text => setUserId(text)}
            value={userId}
            autoCapitalize="none"
          />
        </View>
        <View>
          <Text h2>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" raised={true} onPress={handleLogin} buttonStyle={styles.customButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffe175',
  },
  containertext: {
    width: '100%',
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pic: {
    alignItems: 'center',
    height: '30%',
  },
  titleImage: {
    height: 132,
    width: 120,
  },
  customButton: {
    width: '100%',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 20,
  },
});
