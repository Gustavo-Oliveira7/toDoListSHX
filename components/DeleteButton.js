import React from "react";
import { TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const DeleteButton = ({ onDelete }) => {
  const confirmDelete = () => {
    Alert.alert(
      "Delete task",
      "Are you sure you want to delete the task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: onDelete, style: "destructive" }
      ]
    );
  };

  return (
    <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
      <Feather name="trash-2" size={20} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeleteButton;