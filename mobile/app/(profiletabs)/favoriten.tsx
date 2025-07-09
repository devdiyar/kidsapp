import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function FavoritenScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favoriten (vorrübergehend)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, fontWeight: 'bold' },
});