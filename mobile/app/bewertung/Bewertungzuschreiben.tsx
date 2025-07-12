import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import Toast from 'react-native-toast-message';
import { useRouter, useLocalSearchParams } from 'expo-router';

export function BewertungModal({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const [bewertungText, setBewertungText] = useState('');
  const [bewertungStars, setBewertungStars] = useState(0);

  const handleBewertungAbsenden = () => {
    onClose();
    setBewertungText('');
    setBewertungStars(0);
    Toast.show({
      type: 'success',
      text1: 'Bewertung versandt',
      text2: 'Vielen Dank für deine Bewertung!',
      position: 'top',
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Bewertung</Text>
          <StarRating
            rating={bewertungStars}
            onChange={setBewertungStars}
            starSize={32}
            color="#f1c40f"
            enableHalfStar={false}
            style={{ marginBottom: 16 }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Schreibe deine Bewertung..."
            value={bewertungText}
            onChangeText={setBewertungText}
            multiline
          />
          <TouchableOpacity style={[styles.button, styles.registerButton, { marginTop: 16 }]} onPress={handleBewertungAbsenden}>
            <Text style={styles.buttonText}>Bewertung absenden</Text>
          </TouchableOpacity>
          <Pressable onPress={onClose} style={{ marginTop: 12 }}>
            <Text style={{ color: '#f6471c', textAlign: 'center' }}>Abbrechen</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 80,
    width: '100%',
    marginBottom: 8,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#f6471c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BewertungModal;
