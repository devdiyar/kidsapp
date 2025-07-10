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
import ReviewButton from '@/components/ui/ReviewButton';
import SurveyButton from '@/components/ui/SurveyButton';


type BesuchteVeranstaltung = {
  id: string;
  titel: string;
  ort: string;
  datum: string;
  preis: string;
  bildUrl: any;
  kannBewerten: boolean;
  kannUmfrage: boolean;
};

type FilterOption = {
  id: string;
  label: string;
};

type VeranstaltungKarteProps = {
  veranstaltung: BesuchteVeranstaltung;
  istAufgeklappt: boolean;
  onKarteAntippen: (id: string) => void;
};


//test
const BESUCHTE_VERANSTALTUNGEN: BesuchteVeranstaltung[] = [
  {
    id: '1',
    titel: 'Adventsgrabung',
    ort: 'VK Stadium',
    datum: '28.03 20:00',
    preis: '5€',
    bildUrl: require('../../assets/images/Adventsgrabung.jpg'),
    kannBewerten: false, // bsp diese Veranstaltung kann man nicht bewerten
    kannUmfrage: true,   // aber umfrage machen
  },
  {
    id: '2',
    titel: 'Illusions',
    ort: 'Spielplatz an der Hörde',
    datum: '07.03 14:00',
    preis: 'Gratis',
    bildUrl: require('../../assets/images/Illusion.jpg'),
    kannBewerten: true,  
    kannUmfrage: false,  
  },
  {
    id: '3',
    titel: "Woman's Day",
    ort: 'VK Stadium',
    datum: '03.04 20:00',
    preis: 'Gratis',
    bildUrl: require('../../assets/images/WomansDay.jpg'),
    kannBewerten: true,  
    kannUmfrage: true,   
  },
  {
    id: '4',
    titel: "Kulturrucksack Party",
    ort: 'Jugendzentrum Herne',
    datum: '26.03 14:00',
    preis: 'Gratis',
    bildUrl: require('../../assets/images/Kulturrucksack_Party.jpg'),
    kannBewerten: false, 
    kannUmfrage: false,
  },
];

//die verschiedenen filter , die man anwenden kann
const FILTER_OPTIONEN: FilterOption[] = [
  { id: 'datum', label: 'Datum' },
  { id: 'preis', label: 'Preis' },
  { id: 'ort', label: 'Ort' },
  { id: 'bewertbar', label: 'Bewertbar' },    // nur die, die man bewerten kann
  { id: 'umfrage', label: 'Umfrage' },        // nur die, wo man Umfrage machen kann
];

//hilfsfunktionen 

//macht aus "28.03 20:00" ein richtiges Datum
function macheDatumAusText(datumText: string) {
  //suche nach dem Muster 28.03 20:00
  const gefunden = datumText.match(/(\d{2})\.(\d{2})\s(\d{2}):(\d{2})/);
  if (gefunden) {
    const tag = Number(gefunden[1]);
    const monat = Number(gefunden[2]) - 1; // Monate fangen bei 0 an
    const stunde = Number(gefunden[3]);
    const minute = Number(gefunden[4]);
    const diesJahr = new Date().getFullYear();
    return new Date(diesJahr, monat, tag, stunde, minute);
  }
  return null; //wenn nicht gefunden
}

//  macht aus "5€" die Zahl 5, aus "Gratis" die Zahl 0
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
  
  return 99999; // hohe Zahl falls nichts gefunden
}

//einzelne Karte für eine veranstaltung aufklappbar für details

function VeranstaltungKarte({ veranstaltung, istAufgeklappt, onKarteAntippen }: VeranstaltungKarteProps) {
  
  // passiert wenn jemand eine Bewertung abgibt
  const bewertungAbgeben = () => {
    Alert.alert('Bewertung', `Bewertung für "${veranstaltung.titel}" abgeben`);
  };

  // passiert wenn jemand eine Umfrage ausfüllt
  const umfrageAusfuellen = () => {
    Alert.alert('Umfrage', `Umfrage für "${veranstaltung.titel}" ausfüllen`);
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
          <Text style={styles.aktionsUeberschrift}>Aktionen</Text>
          <View style={styles.buttonContainer}>
            {veranstaltung.kannBewerten && (
              <ReviewButton 
                onPress={bewertungAbgeben} 
              />
            )}
            {veranstaltung.kannUmfrage && (
              <SurveyButton 
                onPress={umfrageAusfuellen} 
              />
            )}
            {!veranstaltung.kannBewerten && !veranstaltung.kannUmfrage && (
              <Text style={styles.keineAktionenText}>
                Keine Aktionen verfügbar
              </Text>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}



//hauptbildschirm für besuchte Veranstaltungen
export default function BesuchteVeranstaltungenScreen() {
  //Variablen speichern den aktuellen Zustand
  const [welcheKarteIstOffen, setWelcheKarteIstOffen] = useState<string | null>(null);
  const [welcherFilterIstAktiv, setWelcherFilterIstAktiv] = useState<string | null>(null);
  const [wieRumSortieren, setWieRumSortieren] = useState<'asc' | 'desc'>('asc');
  const [wasSuchen, setWasSuchen] = useState<string>('');

  //funktion um Karte auf und zu zu machen
  const karteAufZuMachen = (id: string) => {
    setWelcheKarteIstOffen(jetzigeKarte => {
      // Wenn gleiche Karte , dann zumachen
      if (jetzigeKarte === id) {
        return null;
      }
      // Sonst Karte neu aufmachen
      return id;
    });
  };

  // schauen ob eine bestimmte Karte offen ist
  const istDieKarteOffen = (id: string): boolean => {
    return welcheKarteIstOffen === id;
  };

  // passiert wenn jemand einen Filter Button drückt
  const filterButtonGedrückt = (filterId: string) => {
    setWelcherFilterIstAktiv(alterFilter => 
      alterFilter === filterId ? null : filterId
    );
  };

  // sortierreihenfolge umdrehen (aufsteigend/absteigend)
  const sortierungUmdrehen = () => {
    setWieRumSortieren(alteSortierung => 
      alteSortierung === 'asc' ? 'desc' : 'asc'
    );
  };

  // gefilterte und sortierte Veranstaltungen 
  const alleVeranstaltungenBearbeitet = useMemo(() => {
    //erstmal alle Veranstaltungen kopieren
    let meineListe = [...BESUCHTE_VERANSTALTUNGEN];

    // wenn jemand was sucht, dann filtern wir
    if (wasSuchen.trim()) {
      meineListe = meineListe.filter(veranstaltung =>
        veranstaltung.titel.toLowerCase().includes(wasSuchen.toLowerCase()) ||
        veranstaltung.ort.toLowerCase().includes(wasSuchen.toLowerCase())
      );
    }

    // schauen welcher Filter aktiv ist
    if (welcherFilterIstAktiv === 'datum') {
      // nach Datum sortieren
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
    } else if (welcherFilterIstAktiv === 'bewertbar') {
      // nur die zeigen, die man bewerten kann
      meineListe = meineListe.filter(v => v.kannBewerten);
    } else if (welcherFilterIstAktiv === 'umfrage') {
      // nur die zeigen, wo man Umfrage machen kann
      meineListe = meineListe.filter(v => v.kannUmfrage);
    } else {
      // Standardmässig nach Titel sortieren
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
        <Text style={styles.headerTitle}>Besuchte Veranstaltungen</Text>
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
        )
        }
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listenInhalt}
        ListEmptyComponent={
          <Text style={styles.leereListe}>
            Keine besuchten Veranstaltungen gefunden
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
  aktionsUeberschrift: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  keineAktionenText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
  },
});
