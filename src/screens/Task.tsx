import React, { useEffect, useState, useCallback } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import Checkbox from "../components/Checkbox";
import DeleteButton from "../components/DeleteButton";
import TaskInput from "../components/TaskInput";

const linkTodo = "https://jsonplaceholder.typicode.com/todos";

const Task = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          if (parsedTasks.length > 0) {
            setData(parsedTasks);
            return;
          }
        }

        const response = await fetch(linkTodo);
        const json = await response.json();
        const initialTasks = json.slice(0, 4);
        setData(initialTasks);
        await saveTasks(initialTasks);
      } catch (error) {
        console.error("Error loading task", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && data.every(task => task.completed)) {
      Alert.alert("Congratulations!", "You have completed all tasks! 🎉");
    }
  }, [data]);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const addTask = useCallback(async (taskTitle) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      completed: false,
    };

    const updatedTasks = [...data, newTask];
    setData(updatedTasks);
    await saveTasks(updatedTasks);
  }, [data]);

  const removeTask = useCallback(async (id) => {
    const updatedTasks = data.filter((task) => task.id !== id);
    setData(updatedTasks);
    await saveTasks(updatedTasks);
  }, [data]);

  const toggleCheckbox = useCallback(async (id) => {
    const updatedTasks = data.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setData(updatedTasks);
    await saveTasks(updatedTasks);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <TaskInput onAddTask={addTask} />

      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatList}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={[styles.taskText, item.completed && styles.completedText]}>
                {item.title}
              </Text>
              <Checkbox
                value={item.completed}
                onPress={() => toggleCheckbox(item.id)}
              />
              <DeleteButton onDelete={() => removeTask(item.id)} />
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
    backgroundColor: "#fff",
  },
  flatList: {
    paddingBottom: 20,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: "#A0D8FF",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    color: "#aaa",
    textDecorationLine: "line-through",
  },
});

  
export default Task;
