import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim().length > 0) {
      onAddTask(task);
      setTask(""); 
      Keyboard.dismiss(); 
    }
  };

  const isDisabled = task.trim().length === 0;

  return (
    <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        placeholder="Write a task"
        value={task}
        onChangeText={setTask}
    />
    <TouchableOpacity 
    style={[styles.sendButton, isDisabled && styles.disabledButton]}
    onPress={handleAddTask}
    disabled={isDisabled}>
        <Ionicons name="send" size={20} color="white" />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flex: '1',
    minWidth: "300",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    flexDirection: "row",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 5,
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
});

export default TaskInput;
