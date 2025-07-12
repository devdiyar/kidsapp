import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import AppButton from "@/components/ui/AppButton";
import AppTextInput from "@/components/ui/AppTextInput";
import { router } from "expo-router";
import { useAuth } from "../../src/context/authContext";
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { state, login, clearError } = useAuth();

  useEffect(() => {
    if (state.error) {
      clearError();
    }
  }, [username, password]);

  useEffect(() => {
    if (state.isAuthenticated && !state.isLoading) {
      router.replace("/(tabs)");
    }
  }, [state.isAuthenticated, state.isLoading]);

  const handleLogin = async () => {
    if (!username.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie einen Benutzernamen oder E-Mail ein.',
      });
      return;
    }

    if (!password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie ein Passwort ein.',
      });
      return;
    }

    const success = await login(username.trim(), password);
    
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Erfolgreich',
        text2: 'Sie wurden erfolgreich angemeldet!',
      });
      router.replace("/(tabs)");
    } else {
      Toast.show({
        type: 'error',
        text1: 'Anmeldung fehlgeschlagen',
        text2: state.error || 'Unbekannter Fehler',
      });
    }
  };

  const handleGuestMode = () => {
    router.replace("/(tabs)");
  };

  if (state.isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={styles.loadingText}>Wird geladen...</Text>
      </View>
    );
  }

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
          onPress={handleLogin}
          disabled={state.isLoading}
        />
        <AppButton
          title="Ein Konto erstellen"
          onPress={() => router.push("/(auth)/register")}
          variant="black"
          disabled={state.isLoading}
        />
        <Text style={styles.orText}>Oder</Text>
        <AppButton
          title="Ohne Anmeldung fortfahren"
          onPress={handleGuestMode}
          variant="black"
          disabled={state.isLoading}
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
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});