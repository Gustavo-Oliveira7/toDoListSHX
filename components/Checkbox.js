import React from "react";
import { Pressable, View, StyleSheet, Dimensions } from "react-native";

const Checkbox = ({ value, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, value && styles.checked]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  checked: {
    backgroundColor: "#007AFF",
  },
});

export default Checkbox;
