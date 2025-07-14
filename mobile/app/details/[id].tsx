import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import { Veranstaltung, Bewertung } from '../../src/types/veranstaltung';
import { veranstaltungService } from '../../src/services/veranstaltungService';
import Toast from 'react-native-toast-message'; //fuer Bestätigungshinweis anzeigen bei Anmeldung
import { StarRatingDisplay } from 'react-native-star-rating-widget';//fuer Sternebewertung
import { Ionicons } from '@expo/vector-icons'; //fuer Icons zu favorisieren
import { Share } from 'react-native';// Share-Funktionalität
import { BewertungModal } from '../bewertung/Bewertungzuschreiben';
import { BewertungenView } from '../bewertung/BewertungenView';
import { useVeranstaltung } from '../../src/context/VeranstaltungContext';

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { setCurrentVeranstaltungId } = useVeranstaltung();
  const [veranstaltung, setVeranstaltung] = useState<Veranstaltung | null>(null);
  const [loading, setLoading] = useState(true);
  //"Anmelden" Button ：useState
  const [isRegistered, setIsRegistered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bewertungenVisible, setBewertungenVisible] = useState(false);
  const placeholderImage = require('../../assets/images/placeholder.png'); //placeholder

  useEffect(() => {
    const loadVeranstaltung = async () => {
      setLoading(true);
      const result = await veranstaltungService.getVeranstaltungById(Number(id));
      if (result.success && result.data) {
        setVeranstaltung(result.data);
        setCurrentVeranstaltungId(String(id));
      } else {
        console.error('Fehler beim Laden der Veranstaltung:', result.error);
      }
      setLoading(false);
    };

    if (id) {
      loadVeranstaltung();
    }

    return () => {
      setCurrentVeranstaltungId(null);
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lädt...</Text>
      </View>
    );
  }

  if (!veranstaltung) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Veranstaltung nicht gefunden</Text>
      </View>
    );
  }

  // Berechne Durchschnittsbewertung und Anzahl der Bewertungen
  const bewertungen = veranstaltung.bewertungen || [];
  const avgRating = bewertungen.length > 0 
    ? bewertungen.reduce((sum, b) => sum + b.sternanzahl, 0) / bewertungen.length 
    : 0;
  const ratingCount = bewertungen.length;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={veranstaltung.bildUrl ? { uri: veranstaltung.bildUrl } : placeholderImage}
          style={styles.image}
        />
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.title}>{veranstaltung.titel}</Text>
            <Text style={styles.text}>📍 {veranstaltung.anschrift.strasse} {veranstaltung.anschrift.hausnummer}, {veranstaltung.anschrift.plz} {veranstaltung.anschrift.ort}</Text>
            <Text style={styles.text}>🕒 {veranstaltung.termin.datum} {veranstaltung.termin.uhrzeitVon} - {veranstaltung.termin.uhrzeitBis}</Text>
            <Text style={styles.text}>💶 {veranstaltung.preis > 0 ? `${veranstaltung.preis.toFixed(2)} €` : 'Kostenlos'}</Text>
        </View>

        {/* "Anmelden" Button */}
        <TouchableOpacity
          style={[styles.anmelde_button, isRegistered ? styles.cancelButton : styles.registerButton]}
          onPress={() => {
            const newState = !isRegistered;
            setIsRegistered(newState);

            Toast.show({
              type: newState ? 'success' : 'info',
              text1: newState
                ? 'Erfolgreich angemeldet!'
                : 'Erfolgreich storniert!',
              text2: newState
                ? `Wir freuen uns, dich beim Event '${veranstaltung.titel}' am ${veranstaltung.termin.datum} begrüßen zu dürfen. Viel Spaß beim Event!`
                : `Deine Anmeldung zum Event '${veranstaltung.titel}' am ${veranstaltung.termin.datum} wurde storniert. Wir hoffen, dich bald bei einem anderen Event wiederzusehen!`,
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
            ? veranstaltung.beschreibung ?? 'Keine Beschreibung verfügbar.'
            : (veranstaltung.beschreibung?.slice(0, 100) ?? 'Keine Beschreibung verfügbar.') +
              (veranstaltung.beschreibung && veranstaltung.beschreibung.length > 100 ? '...' : '')}
        </Text>
        {veranstaltung.beschreibung && veranstaltung.beschreibung.length > 100 && (
          <TouchableOpacity
            style={styles.mehr_weniger_Button}
            onPress={() => setIsExpanded(prev => !prev)}
          >
            <Text style={styles.mehr_weniger_Button_Text}>
              {isExpanded ? 'Weniger' : 'Mehr >'}
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ marginTop: 16, marginBottom: 16}}>
          <Text style={styles.sectionTitle}>Veranstalter:</Text>
          <Text style={styles.description}>{veranstaltung.veranstalter}</Text>
          <Text style={styles.text}>📧 {veranstaltung.veranstalterEmail}</Text>
          <Text style={styles.text}>📞 {veranstaltung.veranstalterTelefon}</Text>
        </View>

        <Text style={styles.sectionTitle}>Bewertungen:</Text>
        <View style={styles.ratingRow}>
          <StarRatingDisplay rating={avgRating} starSize={20} color="#f1c40f" />
          <Text style={styles.ratingText}>
            {avgRating.toFixed(1)} | {ratingCount} Bewertungen
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bewertungen.slice(0, 3).map((bewertung) => (
            <View key={bewertung.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{bewertung.bewerter.benutzername}</Text>
                <StarRatingDisplay rating={bewertung.sternanzahl} starSize={14} color="#f1c40f" />
              </View>
              <Text style={styles.reviewText}>{bewertung.kommentar}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.allReviewsButton}>
          <Text style={styles.allReviewsText}>Alle Bewertungen →</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Weitere Veranstaltungen:</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Placeholder für weitere Veranstaltungen - würde normalerweise aus der API geladen */}
          <View style={styles.relatedCard}>
            <Image
              source={placeholderImage}
              style={styles.relatedImage}
            />
            <Text style={styles.relatedTitle}>Weitere Veranstaltungen</Text>
            <View style={styles.relatedInfoRow}>
              <Text style={styles.relatedDate}>Laden...</Text>
              <Text style={styles.relatedPrice}>...</Text>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
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
    flex: 1,
  },
  anmelde_button: {
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  registerButton: {
    backgroundColor: '#f6471c',  
  },
  surveyButton: {
    backgroundColor: '#2e88c9',
    marginRight: 10,
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  reviewCard: {
    width: 250,
    height: 115,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reviewName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  reviewText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  allReviewsButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  allReviewsText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  relatedCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  relatedImage: {
    width: '100%',
    height: 80,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 8,
  },
  relatedInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  relatedDate: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  relatedPrice: {
    fontSize: 12,
    color: '#27ae60',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 8,
  },
});
