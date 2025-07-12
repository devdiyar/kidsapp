import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import AppButton from '@/components/ui/AppButton';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/authContext';

export default function SettingsScreen() {
  const { logout } = useAuth();

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
          onPress: async () => {
            try {
              await logout();
              // Direkte Navigation zur Login-Seite mit Reset der Navigation
              router.dismissAll();
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Logout error:', error);
              // Fallback: trotzdem zur Login-Seite weiterleiten
              router.dismissAll();
              router.replace('/(auth)/login');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
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