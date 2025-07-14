import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Bewertung } from '@/src/types/veranstaltung';

export function BewertungenView({ reviews }: { reviews: Bewertung[] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noReviewsText}>Noch keine Bewertungen vorhanden.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{item.bewerter.benutzername}</Text>
              <StarRatingDisplay rating={item.sternanzahl} starSize={16} />
            </View>
            <Text style={styles.reviewText}>{item.kommentar}</Text>
            <Text style={styles.reviewDate}>
              {new Date(item.erstellungsdatum).toLocaleDateString('de-DE')}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 16,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});