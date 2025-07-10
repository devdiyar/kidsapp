import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type SurveyButtonProps = {
  onPress: () => void;
  title?: string;
};

const SurveyButton: React.FC<SurveyButtonProps> = ({ onPress, title = "Umfrage teilnehmen" }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
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

export default SurveyButton;
