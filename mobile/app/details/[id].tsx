import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import { useEffect, useState } from 'react';
import { ACTIVITIES_DATA, Activity } from '../../src/data/activities';
import { REVIEWS_DATA } from '../../src/data/reviews';
import Toast from 'react-native-toast-message'; //fuer Bestätigungshinweis anzeigen bei Anmeldung
import { StarRatingDisplay } from 'react-native-star-rating-widget';//fuer Sternebewertung
import { Ionicons } from '@expo/vector-icons'; //fuer Icons zu favorisieren
import { Share } from 'react-native';// Share-Funktionalität
import { BewertungModal } from '../components/Bewertung';
import { BewertungenView } from '../components/BewertungenView';
import { useActivity } from '../../src/context/ActivityContext';

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { setCurrentActivityId } = useActivity();
  const [activity, setActivity] = useState<Activity | null>(null);
  //"Anmelden" Button ：useState
  const [isRegistered, setIsRegistered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bewertungenVisible, setBewertungenVisible] = useState(false);
  const placeholderImage = require('../../assets/images/placeholder.png'); //placeholder

  

  useEffect(() => {
    const found = ACTIVITIES_DATA.find(item => item.id === String(id));
    setActivity(found || null);
    setCurrentActivityId(String(id));

    return () => {
      setCurrentActivityId(null);
    };
  }, [id]);

  if (!activity) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aktivität nicht gefunden</Text>
      </View>
    );
  }


  const reviewsForActivity = REVIEWS_DATA.filter(r => r.activityId === String(id));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={activity.imageUrl ? activity.imageUrl : placeholderImage}
          style={styles.image}
        />
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.text} >📍 {activity.location}</Text>
             <Text style={styles.text}>🕒 {activity.date}</Text>
            <Text style={styles.text}>💶 {activity.price}</Text>
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
            : (activity.description?.slice(0, 50) ?? 'Keine Beschreibung verfügbar.') +
              (activity.description && activity.description.length > 10 ? '...' : '')}
        </Text>
        {activity.description && activity.description.length > 10 && (
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
        <View>
               <Text style={styles.description}>
                  {isExpanded
                    ? activity.description ?? 'Keine Beschreibung verfügbar.'
                    : (activity.description?.slice(0, 50) ?? 'Keine Beschreibung verfügbar.') +
                      (activity.description && activity.description.length > 10 ? '...' : '')}
                </Text>
        </View>
    </View>

        <Text style={styles.sectionTitle}>Bewertungen:</Text>
        <View style={styles.ratingRow}>
          <StarRatingDisplay rating={activity.rating} starSize={20} color="#f1c40f" />
          <Text style={styles.ratingText}>
            {activity.rating.toFixed(1)} | {activity.ratingCount} Bewertungen
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {reviewsForActivity.slice(0, 3).map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <StarRatingDisplay rating={review.rating} starSize={14} color="#f1c40f" />
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.allReviewsButton}>
          <Text style={styles.allReviewsText}>Alle Bewertungen →</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Weitere Veranstaltungen:</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ACTIVITIES_DATA.filter(item => item.id !== activity.id).map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.relatedCard}
          onPress={() => router.push(`/details/${item.id}`)}
        >
          <Image
            source={item.imageUrl ? item.imageUrl : placeholderImage}
            style={styles.relatedImage}
          />
          <Text style={styles.relatedTitle}>{item.title}</Text>
          <View style={styles.relatedInfoRow}>
          <Text style={styles.relatedDate}>{item.date}</Text>
          <Text style={styles.relatedPrice}>{item.price}</Text>

          </View>
        </TouchableOpacity>
         ))}
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
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
