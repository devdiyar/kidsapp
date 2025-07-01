
import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function AppTextInput(props: any) {
  return (
    <TextInput
      placeholderTextColor="#888"
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#232323",
    color: "#fff",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    width: "100%",
  },
});