import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Dimensions } from "react-native";
import Checkbox from "./Checkbox";

const { width } = Dimensions.get("window");
const linkTodo = "https://jsonplaceholder.typicode.com/todos";

const Task = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isChecked, setChecked] = useState({});

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

  return (
    <SafeAreaView >
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
  });
  
export default Task;
