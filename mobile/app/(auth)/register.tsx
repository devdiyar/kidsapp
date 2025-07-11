import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import AppButton from "@/components/ui/AppButton";
import AppTextInput from "@/components/ui/AppTextInput";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tag, setTag] = useState(0); // 0 = noch nichts ausgewählt
  const [monat, setMonat] = useState(0); // erstmal nichts ausgewählt
  const [jahr, setJahr] = useState(0); // 0 = noch nichts ausgewählt
  const [tagAuf, setTagAuf] = useState(false);
  const [monatAuf, setMonatAuf] = useState(false);
  const [jahrAuf, setJahrAuf] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // datum zusammenbauen für anzeige
  const datumText = () => {
    const tagStr = tag === 0 ? 'TT' : tag.toString().padStart(2, '0');
    const monatStr = monat === 0 ? 'MM' : monat.toString().padStart(2, '0');
    const jahrStr = jahr === 0 ? 'JJJJ' : jahr.toString();
    return `${tagStr}.${monatStr}.${jahrStr}`;
  };

  // wieviele tage hat der monat?
  const wievieleTageDerMonat = () => {
    if (monat === 0 || jahr === 0) return 31; // wenn noch kein monat oder jahr dann alle 31 zeigen
    return new Date(jahr, monat, 0).getDate();
  };
  
  const tage = Array.from({ length: wievieleTageDerMonat() }, (_, i) => i + 1);
  
  // alle monate
  const monate = [
    { name: 'Januar', wert: 1 },
    { name: 'Februar', wert: 2 },
    { name: 'März', wert: 3 },
    { name: 'April', wert: 4 },
    { name: 'Mai', wert: 5 },
    { name: 'Juni', wert: 6 },
    { name: 'Juli', wert: 7 },
    { name: 'August', wert: 8 },
    { name: 'September', wert: 9 },
    { name: 'Oktober', wert: 10 },
    { name: 'November', wert: 11 },
    { name: 'Dezember', wert: 12 },
  ];

  const jahre = Array.from({ length: 126 }, (_, i) => 2025 - i); // von 2025 runter bis 1900

  // checken ob datum ok ist
  const istDatumOk = () => {
    if (monat === 0 || tag === 0 || jahr === 0) return false; // alle müssen gesetzt sein
    const tageLimitDerMonat = new Date(jahr, monat, 0).getDate();
    return tag <= tageLimitDerMonat;
  };

  // wenn monat gewechselt wird
  const monatWechseln = (neuerMonat: number) => {
    setMonat(neuerMonat);
    if (jahr !== 0) { // nur wenn jahr schon gesetzt ist
      const maxTageInDemMonat = new Date(jahr, neuerMonat, 0).getDate();
      if (tag > maxTageInDemMonat) {
        setTag(maxTageInDemMonat);
      }
    }
    setMonatAuf(false);
  };

  // alle dropdowns zumachen
  const alleZu = () => {
    setTagAuf(false);
    setMonatAuf(false);
    setJahrAuf(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrierung</Text>
      
      <AppTextInput
        placeholder="Vorname"
        value={firstName}
        onChangeText={setFirstName}
      />
      
      <AppTextInput
        placeholder="Nachname"
        value={lastName}
        onChangeText={setLastName}
      />
      
      {/* Geburtsdatum Picker */}
      <View style={styles.datePickerContainer}>
        <Text style={styles.datePickerLabel}>Geburtsdatum</Text>
        
        <View style={styles.dateInputRow}>
          {/* Tag Dropdown */}
          <View style={styles.dateInputGroup}>
            <TouchableOpacity 
              style={styles.dateDropdownButton}
              onPress={() => {
                alleZu();
                setTagAuf(!tagAuf);
              }}
            >
              <Text style={[styles.dateDropdownText, tag !== 0 && styles.selectedText]}>
                {tag === 0 ? 'Tag' : tag.toString().padStart(2, '0')}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            <Text style={styles.dateLabel}>Tag</Text>
            
            {tagAuf && (
              <View style={styles.dropdownList}>
                <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                  {tage.map(tagWert => (
                    <TouchableOpacity
                      key={tagWert}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setTag(tagWert);
                        setTagAuf(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{tagWert}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Monat Dropdown */}
          <View style={styles.dateInputGroup}>
            <TouchableOpacity 
              style={styles.dateDropdownButton}
              onPress={() => {
                alleZu();
                setMonatAuf(!monatAuf);
              }}
            >
              <Text style={[styles.dateDropdownText, monat !== 0 && styles.selectedText]}>
                {monat === 0 ? 'Monat' : monate.find(m => m.wert === monat)?.name.substring(0, 3) || 'MM'}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            <Text style={styles.dateLabel}>Monat</Text>
            
            {monatAuf && (
              <View style={styles.dropdownList}>
                <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                  {monate.map(monatObj => (
                    <TouchableOpacity
                      key={monatObj.wert}
                      style={styles.dropdownItem}
                      onPress={() => monatWechseln(monatObj.wert)}
                    >
                      <Text style={styles.dropdownItemText}>{monatObj.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Jahr Dropdown */}
          <View style={styles.dateInputGroup}>
            <TouchableOpacity 
              style={styles.dateDropdownButton}
              onPress={() => {
                alleZu();
                setJahrAuf(!jahrAuf);
              }}
            >
              <Text style={[styles.dateDropdownText, jahr !== 0 && styles.selectedText]}>
                {jahr === 0 ? 'Jahr' : jahr}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            <Text style={styles.dateLabel}>Jahr</Text>
            
            {jahrAuf && (
              <View style={styles.dropdownList}>
                <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                  {jahre.map(jahrWert => (
                    <TouchableOpacity
                      key={jahrWert}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setJahr(jahrWert);
                        setJahrAuf(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{jahrWert}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
        
        {monat !== 0 && !istDatumOk() && (
          <Text style={styles.errorText}>Ungültiges Datum</Text>
        )}
      </View>
      
      <AppTextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <AppTextInput
        placeholder="Benutzername"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <AppTextInput
        placeholder="Neues Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <AppTextInput
        placeholder="Passwort Bestätigen"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <View style={styles.buttonContainer}>
        <AppButton
          title="Registrieren"
          variant="orange"
          onPress={() => {
            // hier Registrierungslogik implementieren

            console.log('Registration attempt:', { firstName, lastName, tag, monat, jahr, email, username, password });
            // nach erfolgreicher Registrierung zur Hauptseite navigieren
            router.push("/(tabs)");
          }}
        />
        
        <AppButton
          title="Habe bereits ein Konto"
          onPress={() => router.push("/(auth)/login")}
          variant="black"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  // datum zeug
  datePickerContainer: {
    marginBottom: 16,
  },
  datePickerLabel: {
    fontSize: 12,
    color: "#6c757d",
    marginBottom: 8,
  },
  dateInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  dateInputGroup: {
    flex: 1,
    position: "relative",
  },
  dateDropdownButton: {
    backgroundColor: "#232323",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 48,
  },
  dateDropdownText: {
    fontSize: 16,
    color: "#888", // grau für placeholder
    fontWeight: "500",
  },
  selectedText: {
    color: "#fff", // weiss wenn was ausgewählt ist
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
  },
  dateLabel: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    marginTop: 4,
  },
  // dropdown liste styling
  dropdownList: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: "#232323",
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: 150,
    zIndex: 1000, // damit es über allem anderen ist
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownScroll: {
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#232323",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    color: "#dc3545", // rot für fehler
    marginTop: 8,
    textAlign: "center",
  },
});