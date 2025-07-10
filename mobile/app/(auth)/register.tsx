import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AppButton from "@/components/ui/AppButton";
import AppTextInput from "@/components/ui/AppTextInput";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrierung</Text>
      
      <AppTextInput
        placeholder="Vorname"
        value={firstName}
        onChangeText={setFirstName}
      />
      
      <AppTextInput
        placeholder="Nachname"
        value={lastName}
        onChangeText={setLastName}
      />
      
      <AppTextInput
        placeholder="Geburtsdatum"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      
      <AppTextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <AppTextInput
        placeholder="Benutzername"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <AppTextInput
        placeholder="Neues Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <AppTextInput
        placeholder="Passwort Bestätigen"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <View style={styles.buttonContainer}>
        <AppButton
          title="Registrieren"
          variant="orange"
        />
        
        <AppButton
          title="Habe bereits ein Konto"
          onPress={() => router.push("/(auth)/login")}
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
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 16,
  },
});