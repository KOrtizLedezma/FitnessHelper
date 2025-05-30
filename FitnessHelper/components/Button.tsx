import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export default function FullSizeButton({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'Transparent',
    borderColor: Colors.primary,
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
