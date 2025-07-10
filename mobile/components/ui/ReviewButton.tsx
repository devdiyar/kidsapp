import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ReviewButtonProps = {
  onPress: () => void;
  title?: string;
};

const ReviewButton: React.FC<ReviewButtonProps> = ({ onPress, title = "Bewertung schreiben" }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReviewButton;
