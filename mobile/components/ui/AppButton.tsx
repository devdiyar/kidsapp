import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: "orange" | "black";
  disabled?: boolean;
}

export default function AppButton({
  title,
  onPress,
  variant = "orange",
  disabled = false,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        variant === "black" ? styles.black : styles.orange,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 6,
    width: "100%",
  },
  orange: {
    backgroundColor: Colors.tabIconSelectedBg,
  },
  black: {
    backgroundColor: Colors.button,
  },
  disabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },

  text: {
    color: "#fff",
    fontSize: 17,
  },
  disabledText: {
    color: "#888",
  },
});
