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

import firebase from '../../services/firebaseConnection';

export default function Login({status}) {
  const [type, setType] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlelogin() {
    if (type === 'login') {
      const user = firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          status(user.user.uid);
        })
        .catch(error => {
          console.log(error);
          alert('ops, parece que aconteceu algum erro...');
          return;
        });
    } else {
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user.user);
          setType('login');
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          console.log(error);
          alert(
            'erro ao cadastrar usuário, tente novamente dentro de alguns segundos',
          );
          return;
        });
    }
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
        <TouchableOpacity
          style={[
            styles.handlelogin,
            {backgroundColor: type === 'login' ? '#4e73b9' : '#f0c517'},
          ]}
          onPress={handlelogin}>
          <Text style={styles.handlelogintext}>
            {' '}
            {type === 'login' ? 'Acessar' : 'Cadastrar'}{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType(type === 'login' ? 'cadastrar' : 'login');
          }}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            {' '}
            {type === 'login'
              ? 'Criar uma conta Grátis'
              : 'Já possuo uma conta'}{' '}
          </Text>
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
    margin: 5,
    height: 45,
    borderRadius: 5,
  },
  handlelogintext: {
    color: '#fff',
    fontSize: 16,
  },
});
