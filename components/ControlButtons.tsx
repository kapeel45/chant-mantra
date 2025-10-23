import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TapCounterState } from '../types';

interface Props {
  state: TapCounterState;
  onPauseResume: () => void;
  onReset: () => void;
}

export const ControlButtons: React.FC<Props> = ({ 
  state, 
  onPauseResume, 
  onReset 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, styles.pauseButton]} 
        onPress={onPauseResume}
      >
        <Text style={styles.buttonText}>
          {state.isRunning ? '⏸️ Pause' : '▶️ Resume'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.resetButton]} 
        onPress={onReset}
      >
        <Text style={styles.buttonText}>🔄 Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});