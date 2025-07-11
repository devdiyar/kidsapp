import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function AppButton(props:any) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.button,
        props.variant === "black" ? styles.black : styles.orange,
      ]}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 6,
    width: "100%"
  },
  orange: {
    backgroundColor: Colors.tabIconSelectedBg,
  },
  black: {
    backgroundColor: Colors.button,
  },
  text: {
    color: "#fff",
    fontSize: 17,
  },
});