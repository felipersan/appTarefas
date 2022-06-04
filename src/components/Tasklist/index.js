import React, {useState} from 'react';
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
      <View>
        <Text style={styles.tarefa}>{tarefa.nome}</Text>
        <Text style={styles.priority}>High</Text>
      </View>
      <View style={styles.btnarea}>
        <TouchableOpacity
          style={{marginRight: 12}}
          onPress={() => {
            editItem(tarefa);
          }}>
          <Feather name="edit-3" color="#f1c617" size={21} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            deleteItem(tarefa.key);
          }}>
          <Feather name={'trash'} color="#f1c617" size={21} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 11,
    elevation: 2,
    height: 85,
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tarefa: {
    fontSize: 19,
    color: '#121212',
  },
  editarea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  editTasks: {
    padding: 5,
    borderRadius: 4,
  },
  priority: {
    backgroundColor: '#f1c617',
    paddingHorizontal: 7,
    paddingVertical: 4,
    maxWidth: 45,
    borderRadius: 7,
    marginTop: 9,
  },
  btnarea: {
    flexDirection: 'row',
  },
});
