import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Feather from "react-native-vector-icons/Feather"; // oder ein anderes Icon-Paket

export default function FilterButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Feather name="filter" size={24} color="#fd573b" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 50, // Passe ggf. für SafeArea an
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
  },
});