import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import AppButton from '@/components/ui/AppButton';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Abmelden',
      'Möchten Sie sich wirklich abmelden?',
      [
        {
          text: 'Abbrechen',
          style: 'cancel',
        },
        {
          text: 'Abmelden',
          style: 'destructive',
          onPress: () => {
          
            console.log('Benutzer abgemeldet');
            
            // Navigation zum Auth Bereich
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Einstellungen</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Konto</Text>
        
        <AppButton
          title="Abmelden"
          onPress={handleLogout}
          variant="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30,
    textAlign: 'center'
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
});