import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlelogin() {
    alert('clicou');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.viewImage}>
          <Image
            source={require('../../assets/image/login.png')}
            style={styles.imageLogin}
          />
        </View>

        <TextInput
          placeholder="Seu Email"
          style={styles.input}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="***********"
          style={styles.input}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <TouchableOpacity style={styles.handlelogin} onPress={handlelogin}>
          <Text style={styles.handlelogintext}> Acessar </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text> Criar uma conta </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    justifyContent: 'center',
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogin: {
    resizeMode: 'contain',
    width: '95%',
  },
  input: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1212',
    fontSize: 16,
  },
  handlelogin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 5,
    height: 45,
    borderRadius: 5,
  },
  handlelogintext: {
    color: '#fff',
    fontSize: 16,
  },
});
