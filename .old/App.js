import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView
} from 'react-native';
import Task from './components/Task';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      {/* Adicionei esse scroll para rolar quando a lista for maior que a página */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Tarefas de hoje */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>A fazer</Text>
          <View style={styles.items}>
            {/* Aqui qyue as tarefas serão renderizadas, substituir por flatlist */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => completeTask(index)}
                  >
                    <Task text={item} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

      </ScrollView>

      {/* Nova tarefa */}
      {/*Usa um keyboard avoiding view que garante que o teclado não cobrirá o elemento */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input}
          placeholder={'Nova tarefa'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity
          onPress={() => handleAddTask()}
        >
          <View style={styles.addWrapper}>
            <Ionicons name="md-checkmark-circle" size={32} color="white" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f7',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 14,
    width: 290,
    fontSize: 20,
    elevation: 3
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#3B9AE1',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3
  },
  addText: {
    fontSize: 30,
    color: '#fff'
  },
});
