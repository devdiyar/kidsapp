import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AppButton from "@/components/ui/AppButton";
import AppTextInput from "@/components/ui/AppTextInput";
import { router } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anmeldung</Text>
      <AppTextInput
        placeholder="Benutzername/Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <AppTextInput
        placeholder="Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <View style={styles.buttonContainer}>
        <AppButton
          title="Anmelden"
          variant="orange"
          onPress={() => {
            // hier loginlogik implementieren
            console.log('Login attempt:', { username, password });
            // nach erfolgreichem Login zur Index-Seite navigieren
            router.replace("/(tabs)");
          }}
        />
        <AppButton
          title="Ein Konto erstellen"
          onPress={() => router.push("/(auth)/register")}
          variant="black"
        />
        <Text style={styles.orText}>Oder</Text>
        <AppButton
          title="Ohne Anmeldung fortfahren"
          onPress={() => router.replace("/(tabs)")}
          variant="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    paddingTop: "35%",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  orText: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 15,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 16,
  },
});