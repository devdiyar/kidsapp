import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function AngemeldeteAktivitaetenScreen() {
  return (
    <View style={styles.container}>
      <Text>Angemeldete Aktivitaeten (vorrübergehend)</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, fontWeight: 'bold' },
});