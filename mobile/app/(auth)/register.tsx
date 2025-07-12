import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import AppButton from "@/components/ui/AppButton";
import AppTextInput from "@/components/ui/AppTextInput";
import DatePicker from "@/components/register/DatePicker";
import { router } from "expo-router";
import { useAuth } from "../../src/context/authContext";
import Toast from 'react-native-toast-message';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateRequiredField,
  validatePasswordsMatch,
  validateDate
} from "../../src/utils/validation";

export default function RegisterScreen() {  
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tag, setTag] = useState(0);
  const [monat, setMonat] = useState(0);
  const [jahr, setJahr] = useState(0);


  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const { state, register, clearError } = useAuth();

  useEffect(() => {
    if (state.error) {
      clearError();
    }
  }, [firstName, lastName, email, username, password, confirmPassword]);

  useEffect(() => {
    if (state.isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [state.isAuthenticated]);

  // Datum-Handler für die DatePicker-Komponente
  const handleDateChange = (day: number, month: number, year: number) => {
    setTag(day);
    setMonat(month);
    setJahr(year);
  };

  // Checken ob Datum OK ist
  const istDatumOk = () => {
    return validateDate(tag, monat, jahr);
  };

  // Validierung der Eingaben
  const validateInputs = (): boolean => {
    if (!validateRequiredField(firstName)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie einen Vornamen ein.',
      });
      return false;
    }

    if (!validateRequiredField(lastName)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie einen Nachnamen ein.',
      });
      return false;
    }

    if (!validateDate(tag, monat, jahr)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie ein gültiges Geburtsdatum ein.',
      });
      return false;
    }

    if (!validateRequiredField(email)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie eine E-Mail-Adresse ein.',
      });
      return false;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      });
      return false;
    }

    if (!validateRequiredField(username)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie einen Benutzernamen ein.',
      });
      return false;
    }

    if (!validateUsername(username)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Der Benutzername muss mindestens 3 Zeichen lang sein.',
      });
      return false;
    }

    if (!validateRequiredField(password)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Bitte geben Sie ein Passwort ein.',
      });
      return false;
    }

    if (!validatePassword(password)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
      });
      return false;
    }

    if (!validatePasswordsMatch(password, confirmPassword)) {
      Toast.show({
        type: 'error',
        text1: 'Fehler',
        text2: 'Die Passwörter stimmen nicht überein.',
      });
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    // Geburtsdatum als Date-Objekt erstellen
    const geburtsdatum = new Date(jahr, monat - 1, tag); // Monat ist 0-basiert in Date

    const success = await register(
      firstName.trim(),
      lastName.trim(),
      email.trim(),
      username.trim(),
      password,
      geburtsdatum
    );
    
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Erfolgreich',
        text2: 'Sie wurden erfolgreich registriert und angemeldet!',
      });
      router.replace("/(tabs)");
    } else {
      Toast.show({
        type: 'error',
        text1: 'Registrierung fehlgeschlagen',
        text2: state.error || 'Unbekannter Fehler',
      });
    }
  };

  if (state.isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={styles.loadingText}>Registrierung läuft...</Text>
      </View>
    );
  }


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
      
      <DatePicker
        selectedDay={tag}
        selectedMonth={monat}
        selectedYear={jahr}
        onDateChange={handleDateChange}
        isDateValid={istDatumOk()}
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
          onPress={handleRegister}
          disabled={state.isLoading}
        />
        
        <AppButton
          title="Habe bereits ein Konto"
          onPress={() => router.push("/(auth)/login")}
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
    justifyContent: "center",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
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