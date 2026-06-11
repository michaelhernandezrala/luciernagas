import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { fontSize, spacing, moderateScale, fontFamily } from '../utils/responsive';

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
          <Text style={styles.title}>PAUSA</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.continueButton]}
              onPress={onContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.emoji}>▶️</Text>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.restartButton]}
              onPress={onRestart}
              activeOpacity={0.8}
            >
              <Text style={styles.emoji}>🔄</Text>
              <Text style={styles.buttonText}>Reiniciar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.quitButton]}
              onPress={onQuit}
              activeOpacity={0.8}
            >
              <Text style={styles.emoji}>🏠</Text>
              <Text style={styles.buttonText}>Menú Principal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1a1d3d',
    borderRadius: moderateScale(24),
    padding: spacing.xl,
    width: '85%',
    maxWidth: moderateScale(400),
    borderWidth: 3,
    borderColor: '#a0a0ff',
    shadowColor: '#a0a0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 15,
  },
  title: {
    fontSize: fontSize.xxlarge,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: spacing.lg,
    letterSpacing: 3,
    fontFamily: fontFamily.regular,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
  button: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: moderateScale(16),
    borderWidth: 3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  continueButton: {
    backgroundColor: '#00FF88',
    borderColor: '#00CC6A',
  },
  restartButton: {
    backgroundColor: '#FFD700',
    borderColor: '#FFC700',
  },
  quitButton: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF5252',
  },
  emoji: {
    fontSize: fontSize.xlarge,
    marginRight: spacing.sm,
    fontFamily: fontFamily.regular,
  },
  buttonText: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: '#0a0e27',
    fontFamily: fontFamily.regular,
  },
});
