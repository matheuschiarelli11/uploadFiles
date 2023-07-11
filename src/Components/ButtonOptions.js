import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ButtonOptions({ onPress, title, backroundColor }){
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: backroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    borderColor: '#d75056',
    borderWidth: 1,
    width: '40%',
    alignSelf: 'center',
    marginTop: '5%'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});