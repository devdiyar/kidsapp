import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

// Beispiel-Daten für Aktivitäten
const ACTIVITIES_DATA = [
  {
    id: '1',
    title: 'Adventsgrabung',
    location: 'VK Stadium',
    date: '28.03 20:00',
    price: '5€',
    imageUrl: require('../../assets/images/Adventsgrabung.jpg'),
    status: null,
  },
  {
    id: '2',
    title: 'Illusions',
    location: 'Spielplatz an der Hörde',
    date: '07.03 14:00',
    price: 'Gratis',
    imageUrl: require('../../assets/images/Illusion.jpg'),
    status: 'Hat begonnen',
  },
  {
    id: '3',
    title: "Woman's Day",
    location: 'VK Stadium',
    date: '03.04 20:00',
    price: 'Gratis',
    imageUrl: require('../../assets/images/WomansDay.jpg'),
    status: null,
  },
  {
  id: '4',
  title: "Kulturrucksack Party",
  location: 'Jugendzentrum Herne',
  date: '26.03 14:00',
  price: 'Gratis',
  imageUrl: require('../../assets/images/Kulturrucksack_Party.jpg'),
  status: null,
  },
  {
    id: '5',
    title: 'Kinder-Flohmarkt',
    location: 'Marktplatz Innenstadt',
    date: '15.06 10:00',
    price: 'Standgebühr 5€',
    imageUrl: require('../../assets/images/Flohmarkt.jpg'),
    status: 'Anmeldung\nerforderlich',
  },
  {
    id: '6',
    title: 'Waldabenteuer für Kids',
    location: 'Stadtwald Süd',
    date: '22.06 15:00',
    price: '3€',
    imageUrl: require('../../assets/images/Waldabenteuer.jpg'),
    status: null,
  },
  {
    id: '7',
    title: 'Märchenstunde in der Bibliothek',
    location: 'Stadtbibliothek Zentrum',
    date: '29.06 11:00',
    price: 'Gratis',
    imageUrl: require('../../assets/images/Märchenstunde.jpg'),
    status: 'Fast\nausgebucht',
  },
  {
    id: '8',
    title: 'Sportfest der Grundschulen',
    location: 'Sportanlage West',
    date: '06.07 09:00',
    price: 'Gratis',
    imageUrl: require('../../assets/images/Sportfest.jpg'),
    status: null,
  },
  {
    id: '9',
    title: 'Kreativwerkstatt: Töpfern',
    location: 'Kunstschule "Farbtupfer"',
    date: '13.07 14:30',
    price: '10€ Materialkosten',
    imageUrl: require('../../assets/images/Töpfern.jpg'),
    status: null,
  },
];

const FILTERS = [
  { id: 'date', label: 'Datum' },
  { id: 'payment', label: 'Zahlung' },
  { id: 'address', label: 'Adresse' },
];

type ActivityItemProps = {
  title: string;
  location: string;
  date: string;
  price: string;
  imageUrl: ImageSourcePropType;
  status?: string | null;
  onPress?: () => void;
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


const ActivityItem: React.FC<ActivityItemProps> = ({ title, location, date, price, imageUrl, status, onPress }) => (
  <Pressable onPress={onPress}>
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
  </Pressable>
);

export default function SearchScreen() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchText, setSearchText] = useState<string>('');

  const router = useRouter();

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(prevFilter => (prevFilter === filterId ? null : filterId));
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const displayedActivities = useMemo(() => {
    // Zuerst nach Suchtext filtern
    let processedActivities = [...ACTIVITIES_DATA].filter(activity => 
      activity.title.toLowerCase().includes(searchText.toLowerCase())
    );

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
  }, [activeFilter, sortOrder, searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Nach Aktivitäten suchen..."
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="while-editing"
        />
      </View>

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

      <FlatList
        data={displayedActivities}
        renderItem={({ item }) => <ActivityItem {...item} 
        onPress={() => router.push({ pathname: '/details/[id]', params: { id: item.id } })}
        />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={<Text style={styles.emptyListText}>Keine Aktivitäten gefunden.</Text>}
      />
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
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});