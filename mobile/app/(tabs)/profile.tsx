import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import AppButton from "@/components/ui/AppButton";
import { useAuth } from "../../src/context/authContext";
import Toast from 'react-native-toast-message';

const profile = () => {
  const { state, logout } = useAuth();

  // Handler für die Buttons
  const handleFavoriten = () => {
    router.push('../(profiletabs)/favoriten');
  };
  const handleAngemeldeteAktivitaeten = () => {
    router.push('../(profiletabs)/angemeldeteVeranstaltungen');
  };
  const handleBesuchteVeranstaltungen = () => {
    router.push('../(profiletabs)/BesuchteVeranstaltungen');
  };
  const handleSettings = () => {
    router.push('../(profiletabs)/Einstellungen');
  };

  // Wenn nicht eingeloggt
  if (!state.isAuthenticated) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/icons/profile/noProfile.png')} 
          style={styles.avatar}
        />
        <Text style={styles.name}>Nicht eingeloggt</Text>
        <AppButton
          title="Anmelden"
          onPress={() => router.push('/(auth)/login')}
          variant="orange"
        />
        <AppButton
          title="Registrieren"
          onPress={() => router.push('/(auth)/register')}
          variant="black"
        />
      </View>
    );
  }

  // Wenn eingeloggt
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/icons/profile/profilSemih.png')} 
        style={styles.avatar} 
      />
      <Text style={styles.name}>Angemeldeter Benutzer</Text>
      <Text style={styles.info}>Benutzer@beispiel.de</Text>
      <Text style={[styles.info, styles.lastInfo]}>Telefonnummer nicht verfügbar</Text>
      
      <AppButton title="Favoriten" onPress={handleFavoriten} variant="orange" />
      <AppButton title="Angemeldete Aktivitäten" onPress={handleAngemeldeteAktivitaeten} variant="orange" />
      <AppButton title="Besuchte Veranstaltungen" onPress={handleBesuchteVeranstaltungen} variant="orange" />
      <AppButton title="Einstellungen" onPress={handleSettings} variant="black" />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 6,
  },
  lastInfo: {
    marginBottom: 100,
  },
});