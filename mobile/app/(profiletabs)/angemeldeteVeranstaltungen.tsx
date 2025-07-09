import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Veranstaltung = {
  id: string;
  titel: string;
  ort: string;
  datum: string;
  preis: string;
  bildUrl: any;
};

type FilterOption = {
  id: string;
  label: string;
};

type VeranstaltungKarteProps = {
  veranstaltung: Veranstaltung;
  istAufgeklappt: boolean;
  onKarteAntippen: (id: string) => void;
};

// test
const ANGEMELDETE_VERANSTALTUNGEN: Veranstaltung[] = [
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
    titel: 'Kinder-Flohmarkt',
    ort: 'Marktplatz Innenstadt',
    datum: '15.06 10:00',
    preis: 'Standgebühr 5€',
    bildUrl: require('../../assets/images/Flohmarkt.jpg'),
  },
  {
    id: '3',
    titel: 'Waldabenteuer für Kids',
    ort: 'Stadtwald Süd',
    datum: '22.06 15:00',
    preis: '3€',
    bildUrl: require('../../assets/images/Waldabenteuer.jpg'),
  },
  {
    id: '4',
    titel: 'Märchenstunde in der Bibliothek',
    ort: 'Stadtbibliothek Zentrum',
    datum: '29.06 11:00',
    preis: 'Gratis',
    bildUrl: require('../../assets/images/Märchenstunde.jpg'),
  },
];

// verschiedene filter, die man auswählen kann
const FILTER_OPTIONEN: FilterOption[] = [
  { id: 'datum', label: 'Datum' },
  { id: 'preis', label: 'Preis' },
  { id: 'ort', label: 'Ort' },
];


// hilfsfunktionen

//macht aus "28.03 20:00" ein richtiges Datum
function macheDatumAusText(datumText: string) {
  // Suche nach dem Muster 28.03 20:00
  const gefunden = datumText.match(/(\d{2})\.(\d{2})\s(\d{2}):(\d{2})/);
  if (gefunden) {
    const tag = Number(gefunden[1]);
    const monat = Number(gefunden[2]) - 1; // Monate fangen bei 0 an 
    const stunde = Number(gefunden[3]);
    const minute = Number(gefunden[4]);
    const diesJahr = new Date().getFullYear();
    return new Date(diesJahr, monat, tag, stunde, minute);
  }
  return null; // Wenn nicht gefunden
}

//macht aus "5€" die Zahl 5, aus "Gratis" die Zahl 0
function holePreisAlsZahl(preisText: string) {
  const kleingeschrieben = preisText.toLowerCase();
  
  // wenn gratis, dann 0
  if (kleingeschrieben === 'gratis') {
    return 0;
  }
  
  // suche nach zahlen im text
  const zahlGefunden = kleingeschrieben.match(/(\d+)/);
  if (zahlGefunden) {
    return Number(zahlGefunden[1]);
  }
  
  return 99999; //hohe Zahl falls nichts gefunden
}


//Komponenten

//einzelne Karte für eine veranstaltung aufklappbar für details
 
function VeranstaltungKarte({ veranstaltung, istAufgeklappt, onKarteAntippen }: VeranstaltungKarteProps) {
  
  // passiert wenn jemand Details sehen will
  const zeigeVeranstaltungsdetails = () => {
    Alert.alert(
      'Veranstaltungsdetails', 
      `Details für "${veranstaltung.titel}" werden angezeigt`
    );
  };

  return (
    <TouchableOpacity 
      style={styles.veranstaltungKarte}
      onPress={() => onKarteAntippen(veranstaltung.id)}
      activeOpacity={0.7}
    >
      {/* Hauptinformationen */}
      <View style={styles.hauptInformationen}>
        <Image source={veranstaltung.bildUrl} style={styles.veranstaltungsBild} />
        <View style={styles.textInformationen}>
          <Text style={styles.veranstaltungsTitel}>{veranstaltung.titel}</Text>
          <Text style={styles.veranstaltungsOrt}>{veranstaltung.ort}</Text>
          <Text style={styles.veranstaltungsDatum}>{veranstaltung.datum}</Text>
          <Text style={styles.veranstaltungsPreis}>{veranstaltung.preis}</Text>
        </View>
      </View>
      
      {/* Aufklappbare Aktionen */}
      {istAufgeklappt && (
        <View style={styles.aktionsBereich}>
          <TouchableOpacity 
            style={styles.detailsButton} 
            onPress={zeigeVeranstaltungsdetails}
          >
            <Text style={styles.detailsButtonText}>Mehr anzeigen</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

// hauptbildschirm für angemeldete Veranstaltungen
export default function AngemeldeteVeranstaltungenScreen() {
  // variablen die den aktuellen Zustand speichern
  const [welcheKarteIstOffen, setWelcheKarteIstOffen] = useState<string | null>(null);
  const [welcherFilterIstAktiv, setWelcherFilterIstAktiv] = useState<string | null>(null);
  const [wieRumSortieren, setWieRumSortieren] = useState<'asc' | 'desc'>('asc');
  const [wasSuchen, setWasSuchen] = useState<string>('');

  // Funktion um Karte auf und zu zu machen
  const karteAufZuMachen = (id: string) => {
    setWelcheKarteIstOffen(jetzigeKarte => {
      //wenn die gleiche Karte geklickt wird-> zumachen
      if (jetzigeKarte === id) {
        return null;
      }
      //sonst die neue Karte aufmachen
      return id;
    });
  };

  //schauen ob eine bestimmte Karte offen ist
  const istDieKarteOffen = (id: string): boolean => {
    return welcheKarteIstOffen === id;
  };

  //was passiert wenn jemand einen Filter Button drückt
  const filterButtonGedrückt = (filterId: string) => {
    setWelcherFilterIstAktiv(alterFilter => 
      alterFilter === filterId ? null : filterId
    );
  };

  //sortierreihenfolge umdrehen (aufsteigend/absteigend)
  const sortierungUmdrehen = () => {
    setWieRumSortieren(alteSortierung => 
      alteSortierung === 'asc' ? 'desc' : 'asc'
    );
  };

  //gefilterte und sortierte Veranstaltungen
  const alleVeranstaltungenBearbeitet = useMemo(() => {
    //erstmal alle Veranstaltungen kopieren
    let meineListe = [...ANGEMELDETE_VERANSTALTUNGEN];

    //wenn jemand was sucht -> filtern 
    if (wasSuchen.trim()) {
      meineListe = meineListe.filter(veranstaltung =>
        veranstaltung.titel.toLowerCase().includes(wasSuchen.toLowerCase()) ||
        veranstaltung.ort.toLowerCase().includes(wasSuchen.toLowerCase())
      );
    }

    //hier schauen wir welcher Filter aktiv ist
    if (welcherFilterIstAktiv === 'datum') {
      //nach Datum sortieren
      meineListe.sort((a, b) => {
        const datumA = macheDatumAusText(a.datum);
        const datumB = macheDatumAusText(b.datum);
        if (!datumA || !datumB) return 0;

        if (wieRumSortieren === 'asc') {
          return datumA.getTime() - datumB.getTime();
        } else {
          return datumB.getTime() - datumA.getTime();
        }
      });
    } else if (welcherFilterIstAktiv === 'preis') {
      // nach Preis sortieren
      meineListe.sort((a, b) => {
        const preisA = holePreisAlsZahl(a.preis);
        const preisB = holePreisAlsZahl(b.preis);
        if (wieRumSortieren === 'asc') {
          return preisA - preisB;
        } else {
          return preisB - preisA;
        }
      });
    } else if (welcherFilterIstAktiv === 'ort') {
      // nach Ort sortieren (alphabetisch)
      meineListe.sort((a, b) => {
        if (wieRumSortieren === 'asc') {
          return a.ort.localeCompare(b.ort);
        } else {
          return b.ort.localeCompare(a.ort);
        }
      });
    } else {
      // Standardmässig-> nach titel sortieren
      meineListe.sort((a, b) => {
        if (wieRumSortieren === 'asc') {
          return a.titel.localeCompare(b.titel);
        } else {
          return b.titel.localeCompare(a.titel);
        }
      });
    }

    return meineListe;
  }, [welcherFilterIstAktiv, wieRumSortieren, wasSuchen]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Suchleiste */}
      <View style={styles.suchContainer}>
        <TextInput
          style={styles.suchEingabe}
          placeholder="Suche nach eine bestimmte Veranstaltung"
          value={wasSuchen}
          onChangeText={setWasSuchen}
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
          {FILTER_OPTIONEN.map((filter: FilterOption) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                welcherFilterIstAktiv === filter.id && styles.aktiverFilterButton,
              ]}
              onPress={() => filterButtonGedrückt(filter.id)}
            >
              <Text style={[
                styles.filterButtonText,
                welcherFilterIstAktiv === filter.id && styles.aktiverFilterButtonText,
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.sortierButton} 
          onPress={sortierungUmdrehen}
        >
          <Text style={styles.sortierButtonText}>
            {wieRumSortieren === 'asc' ? '↑' : '↓'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Header mit Titel und Anzahl */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Angemeldete Veranstaltungen</Text>
        <Text style={styles.headerSubtitle}>{alleVeranstaltungenBearbeitet.length} Veranstaltungen</Text>
      </View>

      {/* Veranstaltungsliste */}
      <FlatList
        data={alleVeranstaltungenBearbeitet}
        renderItem={({ item }) => (
          <VeranstaltungKarte
            veranstaltung={item}
            istAufgeklappt={istDieKarteOffen(item.id)}
            onKarteAntippen={karteAufZuMachen}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listenInhalt}
        ListEmptyComponent={
          <Text style={styles.leereListe}>
            Keine angemeldeten Veranstaltungen gefunden
          </Text>
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
    marginTop: 0,
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
  

  listenInhalt: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
  },
  leereListe: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },

  veranstaltungKarte: {
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
  },
  hauptInformationen: {
    flexDirection: 'row',
  },
  veranstaltungsBild: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textInformationen: {
    flex: 1,
    justifyContent: 'center',
  },
  veranstaltungsTitel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  veranstaltungsOrt: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  veranstaltungsDatum: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  veranstaltungsPreis: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },

  aktionsBereich: {
    marginTop: 12,
    paddingTop: 12,
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