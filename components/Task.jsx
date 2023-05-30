import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Task = (props) => {
  const [complete, setComplete] = useState(false);
  const [promptDelete, setPromptDelete] = useState(false);

  const handleButtonPress = () => {
    if(promptDelete) {
      props.onLongPress();
    } 
    else {
      setComplete(!complete);
    }
  }

  const handleButtonLongPress = () => {
    setPromptDelete(!promptDelete);
  }

  const getIcon = () => {
    if (promptDelete) {
      return 'times';
    } 
    else if (complete) {
      return 'check';
    }
    else {
      return 'clock';
    }
  }

  const getColor = () => {
    if (promptDelete) {
      return '#fff';
    } 
    else if (complete) {
      return '#19C162';
    }
    else {
      return '#a0a0a0';
    }
  }

  const getBg = () => {
    if (promptDelete) {
      return styles.redBg;
    } 
    else if (complete) {
      return styles.greenBg;
    }
    else {
      return styles.infoBg;
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.decoration, getBg() ]}/>
      <View style={styles.content}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <Pressable
          onPress={() => handleButtonPress()}
          onLongPress={() => handleButtonLongPress()}
          style={[styles.button, promptDelete ? styles.redBg : styles.done]}
        >
          <FontAwesome5
            name={getIcon()}
            color={getColor()}
            size={28}
          />
        </Pressable>
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    overflow: 'hidden',
    flexDirection: 'row',
    borderRadius: 14,
    elevation: 3,
    marginBottom: 20,
  },
  decoration: {
    width: 11,
  },
  content: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  item: {
    padding: 15,
  },
  itemText: {
    fontSize: 23,
  },
  button: {
    height: '100%',
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#E3E3E3',
  },
  done: {
    backgroundColor: '#FFF',
  },
  redBg: {
    backgroundColor: '#FF413A',
  },
  greenBg: {
    backgroundColor: '#19C162',
  },
  infoBg: {
    backgroundColor: '#a0a0a0',
  },
  

});

export default Task;

//{ text, onPress }