import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import AppButton from "@/components/ui/AppButton";

const profile = () => {
  const user = {
    isAuthenticated: true,
    name: "Kevin Mayer",
    email: "Kevin_Mayer@gmail.com",
    phone: "+49 (173) 4354233",
    image: require('../../assets/images/icons/profile/profilSemih.png'),
  }
<<<<<<< HEAD

//handler für die buttons siehe unten 
=======
  //handler für die buttons siehe unten 
>>>>>>> feature/frontend-auth
 const handleFavoriten = () => {
    router.push('../(profiletabs)/favoriten');
  };
  const handleAngemeldeteAktivitaeten = () => {
    router.push('../(profiletabs)/angemeldeteaktivitaeten');
  };
  const handleBesuchteAktivitaeten = () => {
    router.push('../(profiletabs)/BesuchteAktivitaeten');
  };
  const handleSettings = () => {
    router.push('../(profiletabs)/settings');
  };

<<<<<<< HEAD

=======
>>>>>>> feature/frontend-auth
//wenn nicht eingeloggt
if (!user.isAuthenticated) {
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
  )
}

  //wenn eingeloggt
  return (
    <View style={styles.container}>
      <Image source={user.image} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.info}>{user.email}</Text>
      <Text style={styles.info}>{user.phone}</Text>

<<<<<<< HEAD
      <TouchableOpacity style={styles.button} onPress={handleFavoriten}><Text style={styles.buttonText}>Favoriten</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAngemeldeteAktivitaeten}><Text style={styles.buttonText}>Angemeldete Aktivitäten</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBesuchteAktivitaeten}><Text style={styles.buttonText}>Besuchte Aktivitäten</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.settingsButton]} onPress={handleSettings}><Text style={styles.buttonText}>Einstellungen</Text></TouchableOpacity>
=======
      <AppButton title="Favoriten" onPress={handleFavoriten} variant="orange" />
      <AppButton title="Angemeldete Aktivitäten" onPress={handleAngemeldeteAktivitaeten} variant="orange" />
      <AppButton title="Besuchte Aktivitäten" onPress={handleBesuchteAktivitaeten} variant="orange" />
      <AppButton title="Einstellungen" onPress={handleSettings} variant="black" />
>>>>>>> feature/frontend-auth
    </View>
  );
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  // button: {
  //   width: '80%',
  //   backgroundColor: '#ff5a3c',
  //   padding: 14,
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  // settingsButton: {
  //   backgroundColor: '#333',
  // },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});