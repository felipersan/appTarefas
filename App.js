import React, {useState, useEffect, useRef} from 'react';
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

  const inputRef = useRef(null);
  const [key, setKey] = useState('');

  const [priority, setPriority] = useState('Baixa');

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
              priority: childItem.val().priority,
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
    } else if (key !== '') {
      firebase
        .database()
        .ref('tarefas')
        .child(user)
        .child(key)
        .update({
          nome: newTask,
          priority: priority,
        })
        .then(() => {
          const findTask = tasks.findIndex(item => item.key === key);
          let cloneTasks = tasks;
          cloneTasks[findTask].nome = newTask;
          setTasks([...cloneTasks]);
        });
      Keyboard.dismiss();
      setNewTask('');
      setKey('');
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
            priority: priority,
          };
          setTasks(oldTasks => [...oldTasks, data]);
          setNewTask('');
          Keyboard.dismiss();
        });
    }
  }

  function handleDelete(key) {
    firebase
      .database()
      .ref('tarefas')
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        let findTask = tasks.filter(item => item.key !== key);
        setTasks(findTask);
      });
  }

  function handleEdit(tarefa) {
    setNewTask(tarefa.nome);
    inputRef.current.focus();
    setKey(tarefa.key);
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
          ref={inputRef}
        />
        <TouchableOpacity style={styles.btnarea} onPress={handleAdd}>
          <Text style={styles.btnadd}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.masterpriority}>
        <Text>Selecione a prioridade da tarefa</Text>
        <View style={styles.priorityarea}>
          <TouchableOpacity
            style={[styles.priority, {backgroundColor: '#4e73b9'}]}
            onPress={() => {
              setPriority('Baixa');
            }}>
            <Text style={styles.textpriority}> Baixa </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.priority, {backgroundColor: '#f1c617'}]}
            onPress={() => {
              setPriority('Média');
            }}>
            <Text style={[styles.textpriority, {color: '#000'}]}> Média </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.priority, {backgroundColor: '#eb472d'}]}
            onPress={() => {
              setPriority('Alta');
            }}>
            <Text style={styles.textpriority}> Alta </Text>
          </TouchableOpacity>
        </View>
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
  masterpriority: {
    marginLeft: 10,
  },
  priorityarea: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  priority: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    marginTop: 9,
    marginRight: 10,
    elevation: 2,
  },
  textpriority: {
    color: '#fff',
  },
});
