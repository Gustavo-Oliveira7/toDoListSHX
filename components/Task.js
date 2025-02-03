import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Dimensions,TextInput, TouchableOpacity, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "./Checkbox";

const { width } = Dimensions.get("window");
const linkTodo = "https://jsonplaceholder.typicode.com/todos";

const Task = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isChecked, setChecked] = useState({});
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch(linkTodo)
      .then((response) => response.json())
      .then((data) => setData(data.slice(0, 4)))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  const toggleCheckbox = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: data.length + 1,
      title: newTask,
      completed: false,
    };
    setData((prevData) => [...prevData, newTaskObj])
    setNewTask(""); 
    Keyboard.dismiss();
  };


  return (
    <SafeAreaView >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.sendButton} onPress={addTask}>
          <Ionicons name="send" size={20} color="blue" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>{item.title}</Text>
              <Checkbox
                value={isChecked[item.id] ?? item.completed}
                onPress={() => toggleCheckbox(item.id)}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
      paddingHorizontal: "5%",
      paddingVertical: "3%",
    },
    title: {
      fontSize: width * 0.06,
      fontWeight: "bold",
      marginBottom: "3%",
      textAlign: "center",
    },
    loadingText: {
      fontSize: width * 0.05,
      textAlign: "center",
      marginTop: "5%",
    },
    taskContainer: {
      flexDirection: "row", 
      alignItems: "center",
      justifyContent: "space-between", 
      backgroundColor: "#A0D8FF",
      paddingVertical: "3%",
      paddingHorizontal: "4%",
      marginVertical: "1.5%",
      borderRadius: width * 0.03, 
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.35, 
      shadowRadius: 8, 
      elevation: 6, 
      width: width * 0.8, 
    },
    taskText: {
      fontSize: width * 0.045, 
      flex: 1, 
      marginRight: "3%",
      color: "#333",
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "#aaa",
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "4%",
      backgroundColor: "#FFF",
      borderRadius: width * 0.02,
      paddingHorizontal: "4%",
      paddingVertical: "2%",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    input: {
      flex: 1,
      fontSize: width * 0.045,
      marginRight: "4%",
    },
  });
  
export default Task;
