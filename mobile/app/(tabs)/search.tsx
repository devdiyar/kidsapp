import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ScrollView, TextInput, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { useVeranstaltungen } from '@/src/hooks/useVeranstaltungen';
import { Veranstaltung } from '@/src/types/veranstaltung';

const FILTERS = [
  { id: 'date', label: 'Datum' },
  { id: 'payment', label: 'Zahlung' },
  { id: 'address', label: 'Adresse' },
];

type VeranstaltungItemProps = {
  id: number;
  title: string;
  location: string;
  date: string;
  price: string;
  imageUrl: string;
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


const VeranstaltungItem: React.FC<VeranstaltungItemProps> = ({ title, location, date, price, imageUrl, status, onPress }) => (
  <Pressable onPress={onPress}>
    <View style={styles.itemContainer}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>Kein Bild</Text>
        </View>
      )}
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
  
  // Hook für Veranstaltungen verwenden
  const { veranstaltungen, loading, error, refreshing, refreshVeranstaltungen } = useVeranstaltungen();

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(prevFilter => (prevFilter === filterId ? null : filterId));
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Hilfsfunktion um Veranstaltung zu Veranstaltung format zu konvertieren
  const veranstaltungToVeranstaltung = (veranstaltung: Veranstaltung) => {
    // Verwende termin.datum für Start- und Endzeit
    const startDate = new Date(veranstaltung.termin?.datum || veranstaltung.startZeit || new Date());
    const dateStr = `${startDate.getDate().toString().padStart(2, '0')}.${(startDate.getMonth() + 1).toString().padStart(2, '0')} ${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    const priceStr = veranstaltung.preis === 0 ? 'Gratis' : `${veranstaltung.preis}€`;
    const locationStr = `${veranstaltung.anschrift?.ort || 'Unbekannt'}`;

    return {
      id: veranstaltung.id,
      title: veranstaltung.titel,
      location: locationStr,
      date: dateStr,
      price: priceStr,
      imageUrl: veranstaltung.bildUrl,
      status: null, // Status für jetzt vereinfacht
    };
  };

  const displayedVeranstaltungen = useMemo(() => {
    // Konvertiere Veranstaltungen zu Veranstaltungen
    let processedVeranstaltungen = veranstaltungen.map(veranstaltungToVeranstaltung);

    // Zuerst nach Suchtext filtern
    processedVeranstaltungen = processedVeranstaltungen.filter(veranstaltung => 
      veranstaltung.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sortierung basierend auf dem activeFilter und sortOrder
    switch (activeFilter) {
      case 'date':
        processedVeranstaltungen.sort((a, b) => {
          const dateA = parseDateString(a.date);
          const dateB = parseDateString(b.date);
          if (!dateA || !dateB) return 0; // Behandelt ungültige Daten, um Abstürze zu vermeiden

          return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });
        break;
      case 'payment':
        processedVeranstaltungen.sort((a, b) => {
          const priceA = parsePriceString(a.price);
          const priceB = parsePriceString(b.price);
          return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
        break;
      case 'address':
        processedVeranstaltungen.sort((a, b) => {
          return sortOrder === 'asc' ? a.location.localeCompare(b.location) : b.location.localeCompare(a.location);
        });
        break;
      default:
        // Standard-Sortierung nach Titel, wenn kein Filter aktiv ist
        processedVeranstaltungen.sort((a, b) => {
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        });
        break;
    }

    return processedVeranstaltungen;
  }, [veranstaltungen, activeFilter, sortOrder, searchText]);

  if (loading && veranstaltungen.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Veranstaltungen werden geladen...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Nach Veranstaltungen suchen..."
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

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={displayedVeranstaltungen}
        renderItem={({ item }) => <VeranstaltungItem {...item} 
        onPress={() => router.push({ pathname: '/details/[id]', params: { id: item.id.toString() } })}
        />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={<Text style={styles.emptyListText}>Keine Veranstaltungen gefunden.</Text>}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshVeranstaltungen()}
            colors={['#007AFF']}
          />
        }
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
  // Neue Styles hinzufügen
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    backgroundColor: '#fee',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44',
  },
  errorText: {
    color: '#c44',
    fontSize: 14,
    fontWeight: '500',
  },
  placeholderImage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
  },
});