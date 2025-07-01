import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";
import { Colors } from "@/constants/Colors";

type AppButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: "orange" | "black";
};

export default function AppButton({ title, onPress, variant = "orange" }: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "orange" ? styles.orange : styles.black,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 6,
    width: "90%"
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