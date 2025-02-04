import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Dimensions,TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import Checkbox from "./Checkbox";

const { width } = Dimensions.get("window");
const linkTodo = "https://jsonplaceholder.typicode.com/todos";

const Task = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isChecked, setChecked] = useState({});
  const [newTask, setNewTask] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setData(JSON.parse(storedTasks));
        } else {
          const response = await fetch(linkTodo);
          const json = await response.json();
          const initialTasks = json.slice(0, 4);
          setData(initialTasks);
          saveTasks(initialTasks);
        }
      } catch (error) {
        console.error("Error loading task", error);
      }  finally {
        setLoading(false); 
      }
    };
  
    fetchData();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("error saving task:", error);
    }
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: Date.now(), 
      title: newTask,
      completed: false,
    };
    const updatedTasks = [...data, newTaskObj];
    setData(updatedTasks);
    saveTasks(updatedTasks);
    setNewTask(""); 
    Keyboard.dismiss(); 
  };

  const removeTask = (id) => {
    const updatedTasks = data.filter((task) => task.id !== id);
    setData(updatedTasks);
    saveTasks(updatedTasks); 
  };


  const toggleCheckbox = (id) => {
    const updatedTasks = data.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setData(updatedTasks);
    saveTasks(updatedTasks);
  };

  const confirmDeleteTask = (id) => {
    Alert.alert(
      "Delete task",
      "Are you sure you want to delete the task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => removeTask(id), style: "destructive" }
      ]
    );
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
              <Text style={[styles.taskText, item.completed ? styles.completedText : null]}>{item.title}</Text>
              <Checkbox
                value={isChecked[item.id] ?? item.completed}
                onPress={() => toggleCheckbox(item.id)}
              />

              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => confirmDeleteTask(item.id)} style={styles.deleteButton}>
                  <Feather name="trash-2" size={20} color="white" />
                </TouchableOpacity>
              </View>
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
      flex: '1',
      minWidth: "300",
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
    actionsContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    deleteButton: {
      backgroundColor: "#D9534F",
      padding: 6,
      borderRadius: 8,
      marginLeft: 10,
    },
  });
  
export default Task;
