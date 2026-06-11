import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export default function PauseModal({ visible, onContinue, onRestart, onQuit }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onContinue}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>⏸️ Pausa</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.continueButton]}
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>▶️ Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.restartButton]}
            onPress={onRestart}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>🔄 Reiniciar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.quitButton]}
            onPress={onQuit}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>🏠 Salir al Menú</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1a1d3d',
    borderRadius: 20,
    padding: 30,
    width: '80%',
    maxWidth: 350,
    borderWidth: 2,
    borderColor: '#a0a0ff',
    shadowColor: '#a0a0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 8,
    borderWidth: 2,
  },
  continueButton: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  restartButton: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  quitButton: {
    backgroundColor: 'transparent',
    borderColor: '#a0a0ff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a0e27',
    textAlign: 'center',
  },
});
