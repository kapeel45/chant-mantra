import React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { CounterDisplay } from '../components/CounterDisplay';
import { ControlButtons } from '../components/ControlButtons';
import { TapHistory } from '../components/TapHistory';
import { useTapCounter } from '../hooks/useTapCounter';

export default function HomeScreen() {
  const { state, handleTap, resetCounter, toggleRunning } = useTapCounter();

  return (
    <View 
      style={styles.container} 
      onStartShouldSetResponder={() => true} 
      onResponderGrant={handleTap}
    >
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>👆 Count on Tap</Text>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusText, { color: state.isRunning ? '#4CAF50' : '#f44336' }]}>
            {state.isRunning ? '● LIVE' : '⏸️ PAUSED'}
          </Text>
        </View>
      </View>

      {/* Counter Display */}
      <CounterDisplay state={state} />

      {/* Control Buttons */}
      <ControlButtons 
        state={state} 
        onPauseResume={toggleRunning} 
        onReset={resetCounter} 
      />

      {/* Tap History */}
      <TapHistory state={state} />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made by Kapil S. Shinde</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1976D2',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statusContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#E3F2FD',
    fontSize: 12,
  },
});