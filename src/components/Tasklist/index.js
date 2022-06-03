import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function TaskList({tarefa, deleteItem, editItem}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => editItem(tarefa)}>
        <Text>{tarefa.nome}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteItem(tarefa.key)}>
        <Feather name="trash" color="#121212" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0c517',
    elevation: 1,
    height: 45,
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
