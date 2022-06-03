import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';

import Login from './src/components/login';
import TaskList from './src/components/Tasklist';

import firebase from './src/services/firebaseConnection';

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    function getTasks() {
      if (!user) {
        return;
      }

      firebase
        .database()
        .ref('tarefas')
        .child(user)
        .once('value', snapshot => {
          setTasks([]);
          snapshot.forEach(childItem => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
            };
            setTasks(oldTasks => [...oldTasks, data]);
          });
        });
    }

    getTasks();
  }, [user]);

  function handleAdd() {
    if (newTask === '') {
      return;
    } else {
      let tarefas = firebase.database().ref('tarefas').child(user);
      let key = tarefas.push().key;

      tarefas
        .child(key)
        .set({
          nome: newTask,
        })
        .then(() => {
          let data = {
            key: key,
            nome: newTask,
          };
          setTasks(oldTasks => [...oldTasks, data]);
          setNewTask('');
          Keyboard.dismiss();
        });
    }
  }

  function handleDelete(key) {
    console.log(key);
  }

  function handleEdit(tarefa) {
    console.log(tarefa);
  }

  if (!user) {
    return (
      <Login
        status={user => {
          setUser(user);
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.areainput}>
        <TextInput
          placeholder="Adicione uma tarefa..."
          style={styles.input}
          value={newTask}
          onChangeText={value => {
            setNewTask(value);
          }}
        />
        <TouchableOpacity style={styles.btnarea} onPress={handleAdd}>
          <Text style={styles.btnadd}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TaskList
            tarefa={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  areainput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    height: 45,
    borderRadius: 4,
    borderColor: '#1212',
    borderWidth: 1,
    marginRight: 5,
    elevation: 1,
    padding: 10,
  },
  btnarea: {
    backgroundColor: '#4e73b9',
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 1,
  },
  btnadd: {
    fontSize: 23,
    color: '#fff',
  },
});
