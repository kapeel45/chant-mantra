import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TapCounterState } from '../types';

interface Props {
  state: TapCounterState;
}

export const CounterDisplay: React.FC<Props> = ({ state }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Taps</Text>
      <Text style={styles.count}>{state.count.toLocaleString()}</Text>
      <Text style={styles.subLabel}>Tap anywhere to count!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  count: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subLabel: {
    fontSize: 16,
    color: '#E3F2FD',
    marginTop: 10,
  },
});