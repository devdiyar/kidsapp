import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Backend-URL zentral definieren
// Für Android-Emulator: 'http://10.0.2.2:8080'
// Für echtes Gerät: z.B. 'http://192.168.178.10:8080' (deine PC-IP im WLAN)
const BACKEND_URL = 'http://10.0.2.2:8080';

// Hilfsfunktion zum Mapping von Backend-Daten auf das Frontend-Format
const mapBackendToActivity = (backendItem: any): ActivityItemProps => {
  // Bildauswahl nach Titel (Fallback-Icon, falls nicht vorhanden)
  const imageMap: Record<string, any> = {
    'Kulturrucksack Party': require('../../assets/images/Kulturrucksack_Party.jpg'),
    'Illusions': require('../../assets/images/Illusion.jpg'),
    "Woman's Day": require('../../assets/images/WomansDay.jpg'),
    'Kinder-Flohmarkt': require('../../assets/images/Flohmarkt.jpg'),
    // ...weitere Zuordnungen nach Bedarf...
  };
  const imageUrl = imageMap[backendItem.titel] || require('../../assets/images/appLogo.png');

  // Preis-String
  let price = 'Gratis';
  if (backendItem.preis && backendItem.preis > 0) {
    price = backendItem.preis + '€';
    if (backendItem.titel && backendItem.titel.toLowerCase().includes('flohmarkt')) {
      price = 'Standgebühr ' + backendItem.preis + '€';
    }
  }

  // Datum und Uhrzeit
  let date = '';
  if (backendItem.termin) {
    const d = new Date(backendItem.termin.datum);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    date = `${day}.${month} ${backendItem.termin.uhrzeitVon}`;
  }

  // Location
  let location = '';
  if (backendItem.anschrift) {
    location = `${backendItem.anschrift.strasse} ${backendItem.anschrift.hausnummer}, ${backendItem.anschrift.plz} ${backendItem.anschrift.ort}`;
  }

  // Status (optional, hier Dummy)
  let status = null;
  if (backendItem.aktuellerstatus && backendItem.aktuellerstatus.id) {
    if (backendItem.aktuellerstatus.id === 3) status = 'Hat begonnen';
    if (backendItem.aktuellerstatus.id === 7) status = 'Fast\nausgebucht';
    if (backendItem.aktuellerstatus.id === 5) status = 'Anmeldung\nerforderlich';
  }

  return {
    id: backendItem.id, // ID übernehmen
    title: backendItem.titel,
    location,
    date,
    price,
    imageUrl,
    status,
  };
};

type ActivityItemProps = {
  id: string | number; // ID hinzufügen
  title: string;
  location: string;
  date: string;
  price: string;
  imageUrl: ImageSourcePropType;
  status?: string | null;
};

// Hilfsfunktion zum Parsen des Datumsstrings
const parseDateString = (dateStr: string): Date | null => {
  const parts = dateStr.match(/(\d{2})\.(\d{2})\s(\d{2}):(\d{2})/);
  if (parts) {
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[2], 10) - 1;
    const hour = parseInt(parts[3], 10);
    const minute = parseInt(parts[4], 10);
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, month, day, hour, minute);
  }
  return null;
};

// Hilfsfunktion zum Parsen des Preisstrings
const parsePriceString = (priceStr: string): number => {
  const lowerPriceStr = priceStr.toLowerCase();
  if (lowerPriceStr === 'gratis') {
    return 0;
  }
  const match = lowerPriceStr.match(/(\d+)/); // Extrahiert die erste Zahl
  if (match) {
    return parseInt(match[1], 10);
  }
  return Number.MAX_SAFE_INTEGER; // Wenn kein Preis gefunden wird, als sehr hoch einstufen
};


const ActivityItem: React.FC<ActivityItemProps> = ({ title, location, date, price, imageUrl, status }) => (
  <View style={styles.itemContainer}>
    <Image source={imageUrl} style={styles.image} />
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
    {status && (
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    )}
  </View>
);

const FILTERS = [
  { id: 'date', label: 'Datum' },
  { id: 'payment', label: 'Zahlung' },
  { id: 'address', label: 'Adresse' },
];

export default function SearchScreen() {
  const [activities, setActivities] = useState<ActivityItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${BACKEND_URL}/api/veranstaltungen`)
      .then(res => {
        if (!res.ok) throw new Error('Fehler beim Laden der Veranstaltungen');
        return res.json();
      })
      .then(data => {
        console.log('Veranstaltungen geladen:', data);
        setActivities(data.map(mapBackendToActivity));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(prevFilter => (prevFilter === filterId ? null : filterId));
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const displayedActivities = useMemo(() => {
    let processedActivities = [...activities];

    // Sortierung basierend auf dem activeFilter und sortOrder
    switch (activeFilter) {
      case 'date':
        processedActivities.sort((a, b) => {
          const dateA = parseDateString(a.date);
          const dateB = parseDateString(b.date);
          if (!dateA || !dateB) return 0; // Behandelt ungültige Daten, um Abstürze zu vermeiden

          return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });
        break;
      case 'payment':
        processedActivities.sort((a, b) => {
          const priceA = parsePriceString(a.price);
          const priceB = parsePriceString(b.price);
          return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
        break;
      case 'address':
        processedActivities.sort((a, b) => {
          return sortOrder === 'asc' ? a.location.localeCompare(b.location) : b.location.localeCompare(a.location);
        });
        break;
      default:
        // Standard-Sortierung nach Titel, wenn kein Filter aktiv ist
        processedActivities.sort((a, b) => {
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        });
        break;
    }

    return processedActivities;
  }, [activities, activeFilter, sortOrder]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterBarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollView}>
          {FILTERS.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                activeFilter === filter.id && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterPress(filter.id)}>
              <Text style={[
                styles.filterButtonText,
                activeFilter === filter.id && styles.activeFilterButtonText,
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
          <Text style={styles.sortButtonText}>
            {sortOrder === 'asc' ? 'Aufsteigend' : 'Absteigend'}
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Lade Veranstaltungen ...</Text>
      ) : error ? (
        <Text style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>{error}</Text>
      ) : (
        <FlatList
          data={displayedActivities}
          renderItem={({ item }) => <ActivityItem {...item} />}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={<Text style={styles.emptyListText}>Keine Aktivitäten gefunden.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterBarContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterScrollView: {
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilterButton: {
    backgroundColor: '#fd573b',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 'auto',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  }
});