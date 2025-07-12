import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

const surveyQuestions: { [key: string]: { q1: string, q2: string } } = {
  '1': { // Adventsgrabung
    q1: 'Wie hat dir und deiner Familie die Adventsgrabung gefallen? Gab es besondere Momente?',
    q2: 'Wie wahrscheinlich ist es, dass du nächstes Jahr wieder an einer unserer Weihnachtsaktivitäten teilnimmst?',
  },
  '3': { // Woman's Day
    q1: 'Was war dein Highlight am Woman\'s Day? Was hat dir besonders gut gefallen?',
    q2: 'Wie wahrscheinlich ist es, dass du eine ähnliche Veranstaltung einer Freundin empfehlen würdest?',
  },
  '9': { // Kreativwerkstatt
    q1: 'Wie kreativ konntest du beim Töpfern sein? Hat es dir Spaß gemacht, etwas Eigenes zu erschaffen?',
    q2: 'Wie wahrscheinlich ist es, dass du einen weiteren Kreativkurs bei uns besuchen würdest?',
  },
  'default': {
    q1: 'Wie hat dir die Aktivität gefallen?',
    q2: 'Wie wahrscheinlich ist es, dass du diese Aktivität einem Freund oder einer Freundin empfehlen würdest?',
  }
};

export default function SurveyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const activityId = typeof params.id === 'string' ? params.id : 'default';
  const activityTitle = params.title || 'Aktivität';

  const questions = surveyQuestions[activityId] || surveyQuestions.default;

  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Hier müsste später die Logik zum Speichern der Antworten im Backend stehen.
    console.log('Activity ID:', activityId);
    console.log('Feedback:', feedbackText);
    console.log('Rating:', rating);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centeredContent}>
          <Text style={styles.thankYouTitle}>Vielen Dank für dein Feedback! 🎉</Text>
          <TouchableOpacity style={styles.submitButton} onPress={() => router.back()}>
            <Text style={styles.submitButtonText}>Erledigt</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Umfrage für</Text>
        <Text style={styles.pageSubtitle}>"{activityTitle}"</Text>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>1. {questions.q1}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Bitte beschreibe deine Erfahrungen..."
            value={feedbackText}
            onChangeText={setFeedbackText}
            multiline
          />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            2. {questions.q2}
          </Text>
          <Text style={styles.scaleDescription}>1 = Sehr unwahrscheinlich, 5 = Sehr wahrscheinlich</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                style={[styles.ratingButton, rating !== null && num <= rating && styles.ratingButtonSelected]}
                onPress={() => setRating(num)}
              >
                <Text style={[styles.ratingButtonText, rating !== null && num <= rating && styles.ratingButtonTextSelected]}>
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={[styles.submitButton, (!rating || !feedbackText) && styles.disabledButton]} onPress={handleSubmit} disabled={!rating || !feedbackText}>
          <Text style={styles.submitButtonText}>Jetzt abschicken</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  scrollContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  pageSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  questionContainer: {
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
    lineHeight: 24,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#333',
  },
  scaleDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ratingButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ratingButtonSelected: {
    backgroundColor: '#2e88c9',
    borderColor: '#2e88c9',
  },
  ratingButtonText: {
    fontSize: 18,
    color: '#333',
  },
  ratingButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2e88c9',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});