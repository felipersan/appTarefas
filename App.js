import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';

import Login from './src/components/login';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Você está logado</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
