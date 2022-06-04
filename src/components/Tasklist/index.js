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
  const [altura, setAltura] = useState(45);

  function slideOut() {
    if (altura == 45) {
      setAltura(80);
    } else {
      setAltura(45);
    }
  }

  return (
    <View style={[styles.container, {height: altura}]}>
      <View>
        <Text style={styles.tarefa}>{tarefa.nome}</Text>
        <View style={styles.editarea}>
          <TouchableOpacity onPress={() => editItem(tarefa)}>
            <Text style={[styles.editTasks]}>
              {altura !== 45 && 'Editar Tarefa'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.trash}
            onPress={() => deleteItem(tarefa.key)}>
            {altura !== 45 && (
              <Feather name={'trash'} color="#121212" size={16} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={slideOut}>
        <Feather
          name={altura == 45 ? 'chevron-down' : 'chevron-up'}
          color="#121212"
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0c517',
    elevation: 1,
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  tarefa: {
    fontSize: 15,
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
  trash: {
    marginLeft: 10,
  },
});
