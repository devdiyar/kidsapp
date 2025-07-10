import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//Beispiel Favoriten
const FAVORITEN_DATEN = [
  {
    id: '1',
    titel: 'Adventsgrabung',
    ort: 'VK Stadium',
    datum: '28.03 20:00',
    preis: '5€',
    bildUrl: require('../../assets/images/Adventsgrabung.jpg'),
  },
  {
    id: '2',
    titel: 'Märchenstunde in der Bibliothek',
    ort: 'Stadtbibliothek Zentrum',
    datum: '29.06 11:00',
    preis: 'Gratis',
    bildUrl: require('../../assets/images/Märchenstunde.jpg'),
  },
  {
    id: '3',
    titel: 'Waldabenteuer für Kids',
    ort: 'Stadtwald Süd',
    datum: '22.06 15:00',
    preis: '3€',
    bildUrl: require('../../assets/images/Waldabenteuer.jpg'),
  },
];

// Filter Optionen
const FILTER_OPTIONEN = [
  { id: 'datum', label: 'Datum' },
  { id: 'preis', label: 'Preis' },
  { id: 'ort', label: 'Ort' },
];

// Hilfsfunktionen
const wandleDatumStringUm = (datumString: string): Date | null => {
  const teile = datumString.match(/(\d{2})\.(\d{2})\s(\d{2}):(\d{2})/);
  if (teile) {
    const tag = parseInt(teile[1], 10);
    const monat = parseInt(teile[2], 10) - 1;
    const stunde = parseInt(teile[3], 10);
    const minute = parseInt(teile[4], 10);
    const aktuellesJahr = new Date().getFullYear();
    return new Date(aktuellesJahr, monat, tag, stunde, minute);
  }
  return null;
};

const extrahierePreisWert = (preisString: string): number => {
  const preisStringKlein = preisString.toLowerCase();
  
  if (preisStringKlein === 'gratis') {
    return 0;
  }
  
  const zahlMatch = preisStringKlein.match(/(\d+)/);
  if (zahlMatch) {
    return parseInt(zahlMatch[1], 10);
  }
  
  return Number.MAX_SAFE_INTEGER;
};

function FavoritenKarte({ favorit, onEntferneFavorit, istAufgeklappt, onKarteAntippen }: { 
  favorit: any; 
  onEntferneFavorit: (id: string) => void;
  istAufgeklappt: boolean;
  onKarteAntippen: (id: string) => void;
}) {
  const handleSternDruecken = () => {
    Alert.alert(
      'Favorit entfernen',
      `Möchten Sie "${favorit.titel}" aus Ihren Favoriten entfernen?`,
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Entfernen', style: 'destructive', onPress: () => onEntferneFavorit(favorit.id) }
      ]
    );
  };

  const zeigeDetails = () => {
    Alert.alert(
      'Veranstaltungsdetails',
      `Details für "${favorit.titel}" werden angezeigt`
    );
  };

  return (
    <TouchableOpacity 
      style={styles.karte}
      onPress={() => onKarteAntippen(favorit.id)}
      activeOpacity={0.7}
    >
      <View style={styles.hauptInformationen}>
        <Image source={favorit.bildUrl} style={styles.bild} />
        <View style={styles.textBereich}>
          <Text style={styles.titel}>{favorit.titel}</Text>
          <Text style={styles.ort}>{favorit.ort}</Text>
          <Text style={styles.datum}>{favorit.datum}</Text>
          <Text style={styles.preis}>{favorit.preis}</Text>
        </View>
        <TouchableOpacity style={styles.favoritenSymbol} onPress={handleSternDruecken}>
          <Text style={styles.stern}>⭐</Text>
        </TouchableOpacity>
      </View>
      
      {/* Aufklappbare Aktionen */}
      {istAufgeklappt && (
        <View style={styles.aktionsBereich}>
          <TouchableOpacity 
            style={styles.detailsButton} 
            onPress={zeigeDetails}
          >
            <Text style={styles.detailsButtonText}>Mehr anzeigen</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function FavoritenScreen() {
  const [favoriten, setFavoriten] = useState(FAVORITEN_DATEN);
  const [aufgeklappteKarte, setAufgeklappteKarte] = useState<string | null>(null);
  const [aktiverFilter, setAktiverFilter] = useState<string | null>(null);
  const [sortierReihenfolge, setSortierReihenfolge] = useState<'asc' | 'desc'>('asc');
  const [suchText, setSuchText] = useState<string>('');

  const entferneFavorit = (id: string) => {
    setFavoriten(vorherigeFavoriten => 
      vorherigeFavoriten.filter(favorit => favorit.id !== id)
    );
  };

  // Karte auf und zuklappen
  const karteUmschalten = (id: string) => {
    setAufgeklappteKarte(aktuelleKarte => {
      // Wenn die gleiche Karte angeklickt wird, schließen
      if (aktuelleKarte === id) {
        return null;
      }
      // Ansonsten neue Karte öffnen (alte wird automatisch geschlossen)
      return id;
    });
  };

  // Prüfen ob Karte aufgeklappt ist
  const istKarteAufgeklappt = (id: string): boolean => {
    return aufgeklappteKarte === id;
  };

  // Filter Button Handler
  const filterButtonAntippen = (filterId: string) => {
    setAktiverFilter(vorherigenFilter => 
      vorherigenFilter === filterId ? null : filterId
    );
  };

  // Sortierreihenfolge umschalten
  const sortierReihenfolgeUmschalten = () => {
    setSortierReihenfolge(vorherigeSortierung => 
      vorherigeSortierung === 'asc' ? 'desc' : 'asc'
    );
  };

  // Gefilterte und sortierte Favoriten berechnen
  const verarbeiteFavoriten = useMemo(() => {
    let bearbeiteteVeranstaltungen = [...favoriten];

    // nach suchtext filtern
    if (suchText.trim()) {
      bearbeiteteVeranstaltungen = bearbeiteteVeranstaltungen.filter(veranstaltung =>
        veranstaltung.titel.toLowerCase().includes(suchText.toLowerCase()) ||
        veranstaltung.ort.toLowerCase().includes(suchText.toLowerCase())
      );
    }

    // nach aktivem Filter sortieren
    switch (aktiverFilter) {
      case 'datum':
        bearbeiteteVeranstaltungen.sort((a, b) => {
          const datumA = wandleDatumStringUm(a.datum);
          const datumB = wandleDatumStringUm(b.datum);
          if (!datumA || !datumB) return 0;

          return sortierReihenfolge === 'asc' 
            ? datumA.getTime() - datumB.getTime() 
            : datumB.getTime() - datumA.getTime();
        });
        break;
        
      case 'preis':
        bearbeiteteVeranstaltungen.sort((a, b) => {
          const preisA = extrahierePreisWert(a.preis);
          const preisB = extrahierePreisWert(b.preis);
          return sortierReihenfolge === 'asc' ? preisA - preisB : preisB - preisA;
        });
        break;
        
      case 'ort':
        bearbeiteteVeranstaltungen.sort((a, b) => {
          return sortierReihenfolge === 'asc' 
            ? a.ort.localeCompare(b.ort) 
            : b.ort.localeCompare(a.ort);
        });
        break;
        
      default:
        // Standardsortierung nach Titel
        bearbeiteteVeranstaltungen.sort((a, b) => {
          return sortierReihenfolge === 'asc' 
            ? a.titel.localeCompare(b.titel) 
            : b.titel.localeCompare(a.titel);
        });
        break;
    }

    return bearbeiteteVeranstaltungen;
  }, [favoriten, aktiverFilter, sortierReihenfolge, suchText]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Suchleiste */}
      <View style={styles.suchContainer}>
        <TextInput
          style={styles.suchEingabe}
          placeholder="Suche nach einer bestimmten Veranstaltung"
          value={suchText}
          onChangeText={setSuchText}
          placeholderTextColor="#999"
        />
      </View>

      {/* Filter- und Sortierleiste */}
      <View style={styles.filterLeiste}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterScrollBereich}
        >
          {FILTER_OPTIONEN.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                aktiverFilter === filter.id && styles.aktiverFilterButton,
              ]}
              onPress={() => filterButtonAntippen(filter.id)}
            >
              <Text style={[
                styles.filterButtonText,
                aktiverFilter === filter.id && styles.aktiverFilterButtonText,
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.sortierButton} 
          onPress={sortierReihenfolgeUmschalten}
        >
          <Text style={styles.sortierButtonText}>
            {sortierReihenfolge === 'asc' ? '↑' : '↓'}
          </Text>
        </TouchableOpacity>
      </View>
{/* Header mit Titel und Anzahl */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meine Favoriten</Text>
        <Text style={styles.headerSubtitle}>{verarbeiteFavoriten.length} Veranstaltungen</Text>
      </View>

      <FlatList
        data={verarbeiteFavoriten}
        renderItem={({ item }) => (
          <FavoritenKarte 
            favorit={item} 
            onEntferneFavorit={entferneFavorit}
            istAufgeklappt={istKarteAufgeklappt(item.id)}
            onKarteAntippen={karteUmschalten}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.liste}
        ListEmptyComponent={
          <View style={styles.leerContainer}>
            <Text style={styles.leereListe}>Keine Favoriten gefunden</Text>
            <Text style={styles.leereHinweis}>
              {suchText.trim() ? 'Keine Favoriten entsprechen Ihrer Suche' : 'Fügen Sie Veranstaltungen zu Ihren Favoriten hinzu, um sie hier zu sehen'}
            </Text>
          </View>
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
  
  suchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#f8f9fa',
    marginTop: 0,
  },
  suchEingabe: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  
  filterLeiste: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  filterScrollBereich: {
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
  aktiverFilterButton: {
    backgroundColor: '#fd573b',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  aktiverFilterButtonText: {
    color: 'white',
  },
  sortierButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 'auto',
  },
  sortierButtonText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: '#f8f9fa',
    marginTop:0
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  
  liste: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  
  leerContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  
  leereListe: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
    fontWeight: '600',
  },
  
  leereHinweis: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    paddingHorizontal: 20,
  },

  karte: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  
  hauptInformationen: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  bild: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  
  textBereich: {
    flex: 1,
  },
  
  titel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  
  ort: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  
  datum: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  
  preis: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: 'bold',
  },

  favoritenSymbol: {
    marginLeft: 10,
    padding: 8,
  },
  
  stern: {
    fontSize: 24,
  },

  aktionsBereich: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  
  detailsButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});