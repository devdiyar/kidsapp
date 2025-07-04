import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import { ACTIVITIES_DATA, Activity } from '../../src/data/activities';
import Toast from 'react-native-toast-message'; //fuer Bestätigungshinweis anzeigen bei Anmeldung
import { StarRatingDisplay } from 'react-native-star-rating-widget';//fuer Sternebewertung
import { BewertungModal } from '../components/Bewertung';

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activity, setActivity] = useState<Activity | null>(null);
//"Anmelden" Button ：useState
  const [isRegistered, setIsRegistered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const placeholderImage = require('../../assets/images/placeholder.png'); //placeholder

  useEffect(() => {
    const found = ACTIVITIES_DATA.find(item => item.id === String(id));
    setActivity(found || null);
  }, [id]);
  
  if (!activity) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aktivität nicht gefunden</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
    <Image
    source={activity.imageUrl ? activity.imageUrl : placeholderImage}
    style={styles.image}
  />
    <Text style={styles.title}>{activity.title}</Text>
    <Text style={styles.text}>📍 {activity.location}</Text>
    <Text style={styles.text}>🕒 {activity.date}</Text>
    <Text style={styles.text}>💶 {activity.price}</Text>

       {/* "Anmelden" Button */}
        <TouchableOpacity
          style={[styles.button, isRegistered ? styles.cancelButton : styles.registerButton]}
          onPress={() => {
                    const newState = !isRegistered;
                    setIsRegistered(newState);

                    Toast.show({
                      type: newState ? 'success' : 'info',
                      text1: newState
                            ? 'Erfolgreich angemeldet!'
                            : 'Erfolgreich storniert!',
                          text2: newState
                            ? `Wir freuen uns, dich beim Event '${activity.title}' am ${activity.date} begrüßen zu dürfen. Viel Spaß beim Event!`
                            : `Deine Anmeldung zum Event '${activity.title}' am ${activity.date} wurde storniert. Wir hoffen, dich bald bei einem anderen Event wiederzusehen!`,
                      position: 'top',
                    });
                  }}
        >
          <Text style={styles.buttonText}>
            {isRegistered ? 'Stornieren' : 'Anmelden'}
          </Text>
        </TouchableOpacity>

      <Text style={styles.description}>
        {isExpanded
        ? activity.description ?? 'Keine Beschreibung verfügbar.'
        : (activity.description?.slice(0, 10) ?? 'Keine Beschreibung verfügbar.') + (activity.description && activity.description.length > 10 ? '...' : '')}
      </Text>
       {activity.description && activity.description.length > 10 && (
      <TouchableOpacity
       style={[styles.mehr_weniger_Button, styles.mehr_weniger_Button]}
      onPress={() => setIsExpanded(prev => !prev)}
    >
    <Text style={styles.mehr_weniger_Button_Text}>
      {isExpanded ? 'Weniger' : 'Mehr >'}
    </Text>
  </TouchableOpacity>
   )}
  <Text style={styles.sectionTitle}>Veranstalter:</Text>



  <Text style={styles.sectionTitle}>Bewertungen:</Text>
  <StarRatingDisplay rating={activity.rating} starSize={20} color="#f1c40f" />
  <Text>{activity.rating.toFixed(1)} | {activity.ratingCount} Bewertungen</Text>
      
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, styles.registerButton, { marginHorizontal: 20, marginBottom: 24 }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Bewertung schreiben</Text>
      </TouchableOpacity>
      <BewertungModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 24,
  marginBottom: 8,
},
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  rating: {
    marginTop: 16,
    fontSize: 18,
    color: '#f1c40f',
  },
  status: {
    marginTop: 6,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },

  button: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#f6471c',
  },
  cancelButton: {
    backgroundColor: '#a81010',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
   mehr_weniger_Button: {
   alignItems: 'center',
  },
  mehr_weniger_Button_Text: {
    color: '#f6471c',
  },

});
