import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { TapCounterState } from '../types';

interface Props {
  state: TapCounterState;
}

export const TapHistory: React.FC<Props> = ({ state }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Taps (Last 10)</Text>
      <ScrollView style={styles.list} nestedScrollEnabled>
        {state.tapHistory.length > 0 ? (
          state.tapHistory.map((tap, index) => (
            <Text key={index} style={styles.item}>{tap}</Text>
          ))
        ) : (
          <Text style={styles.empty}>Start tapping to see history!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    margin: 20,
    borderRadius: 15,
    padding: 15,
    maxHeight: 200,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  list: {
    maxHeight: 140,
  },
  item: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    padding: 2,
  },
  empty: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
});