import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const CATEGORIES = ["Sport", "Musik", "Kunst", "Technik", "Natur", "Spiele"];





const Filter: React.FC<Props> = ({ visible, onClose }) => {
  const insets = useSafeAreaInsets();
  const [distance, setDistance] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [cost, setCost] = useState(0);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.background} activeOpacity={1} onPress={onClose} />
      <View style={[styles.Content, { paddingBottom: 24 + insets.bottom }]}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>Filter</Text>
        <View style={{ width: "100%", alignItems: "center", marginBottom: 24 }}>
          <Text style={{ fontSize: 16, marginBottom: 8 }}>
            Distanz: {distance} km
          </Text>
          <Slider
            style={{ width: 300, height: 50 }}
            minimumValue={0}
            maximumValue={15}
            step={1}
            value={distance}
            minimumTrackTintColor="#fd573b"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#fd573b"
            onValueChange={setDistance}
          />
        </View>
        <View style={{ width: "100%", marginBottom: 16 }}>
          <TouchableOpacity
            style={styles.collapseHeader}
            onPress={() => setCategoriesExpanded((prev) => !prev)}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Kategorien</Text>
            <Text style={{ fontSize: 18 }}>
              {categoriesExpanded ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>
          {categoriesExpanded && (
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.listItem,
                    selectedCategories.includes(item) && styles.listItemSelected,
                  ]}
                  onPress={() => toggleCategory(item)}
                >
                  <Text
                    style={[
                      styles.listItemText,
                      selectedCategories.includes(item) && styles.listItemTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.flatList}
            />
          )}
          <View style={{ width: "100%", alignItems: "center", marginBottom: 24, marginTop: 16,}}>
  
  <Slider
    style={{ width: 300, height: 50 }}
    minimumValue={0}
    maximumValue={50}
    step={1}
    value={cost}
    minimumTrackTintColor="#fd573b"
    maximumTrackTintColor="#ccc"
    thumbTintColor="#fd573b"
    onValueChange={setCost}
    
  />
  <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: "bold" }}>
    Kosten bis: {cost} €
  </Text>
</View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" , gap: 16}}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={{ color: "#fd573b", fontWeight: "bold" }}>Schließen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={{ color: "#fd573b", fontWeight: "bold" }}>anwenden</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  Content: {
    width: "100%",
    height: "85%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  collapseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    marginBottom: 4,
  },
  flatList: {
    width: "100%",
    maxHeight: 180,
    marginTop: 8,
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  listItemSelected: {
    backgroundColor: "#fd573b",
  },
  listItemText: {
    color: "#333",
    fontSize: 16,
  },
  listItemTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Filter; 