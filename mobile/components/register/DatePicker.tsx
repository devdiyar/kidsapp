import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface DatePickerProps {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
  onDateChange: (day: number, month: number, year: number) => void;
  isDateValid: boolean;
}

export default function DatePicker({
  selectedDay,
  selectedMonth,
  selectedYear,
  onDateChange,
  isDateValid
}: DatePickerProps) {
  const [tagAuf, setTagAuf] = useState(false);
  const [monatAuf, setMonatAuf] = useState(false);
  const [jahrAuf, setJahrAuf] = useState(false);

  // Wieviele Tage hat der Monat?
  const wievieleTageDerMonat = () => {
    if (selectedMonth === 0 || selectedYear === 0) return 31;
    return new Date(selectedYear, selectedMonth, 0).getDate();
  };
  
  const tage = Array.from({ length: wievieleTageDerMonat() }, (_, i) => i + 1);
  
  // Alle Monate
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

  // Alle Dropdowns schließen
  const alleZu = () => {
    setTagAuf(false);
    setMonatAuf(false);
    setJahrAuf(false);
  };

  // Wenn Monat gewechselt wird
  const monatWechseln = (neuerMonat: number) => {
    if (selectedYear !== 0) {
      const maxTageInDemMonat = new Date(selectedYear, neuerMonat, 0).getDate();
      const neuerTag = selectedDay > maxTageInDemMonat ? maxTageInDemMonat : selectedDay;
      onDateChange(neuerTag, neuerMonat, selectedYear);
    } else {
      onDateChange(selectedDay, neuerMonat, selectedYear);
    }
    setMonatAuf(false);
  };

  const tagWechseln = (neuerTag: number) => {
    onDateChange(neuerTag, selectedMonth, selectedYear);
    setTagAuf(false);
  };

  const jahrWechseln = (neuesJahr: number) => {
    // Prüfen ob der aktuelle Tag im neuen Jahr/Monat gültig ist
    if (selectedMonth !== 0) {
      const maxTageInDemMonat = new Date(neuesJahr, selectedMonth, 0).getDate();
      const neuerTag = selectedDay > maxTageInDemMonat ? maxTageInDemMonat : selectedDay;
      onDateChange(neuerTag, selectedMonth, neuesJahr);
    } else {
      onDateChange(selectedDay, selectedMonth, neuesJahr);
    }
    setJahrAuf(false);
  };

  return (
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
            <Text style={[styles.dateDropdownText, selectedDay !== 0 && styles.selectedText]}>
              {selectedDay === 0 ? 'Tag' : selectedDay.toString().padStart(2, '0')}
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
                    onPress={() => tagWechseln(tagWert)}
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
            <Text style={[styles.dateDropdownText, selectedMonth !== 0 && styles.selectedText]}>
              {selectedMonth === 0 ? 'Monat' : monate.find(m => m.wert === selectedMonth)?.name.substring(0, 3) || 'MM'}
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
            <Text style={[styles.dateDropdownText, selectedYear !== 0 && styles.selectedText]}>
              {selectedYear === 0 ? 'Jahr' : selectedYear}
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
                    onPress={() => jahrWechseln(jahrWert)}
                  >
                    <Text style={styles.dropdownItemText}>{jahrWert}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
      
      {selectedMonth !== 0 && !isDateValid && (
        <Text style={styles.errorText}>Ungültiges Datum</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  dropdownList: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: "#232323",
    borderRadius: 8,
    borderWidth: 1,
    maxHeight: 150,
    zIndex: 1000,
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
    color: "#dc3545",
    marginTop: 8,
    textAlign: "center",
  },
});
