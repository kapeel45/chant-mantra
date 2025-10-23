import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { TapCounterState } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onMilestoneChange: (interval: number) => void;
  currentMilestone: number;
}

export const SettingsModal: React.FC<Props> = ({
  visible,
  onClose,
  onMilestoneChange,
  currentMilestone,
}) => {
  const [customValue, setCustomValue] = useState('');

  const presetIntervals = [10, 25, 50, 100, 250, 500];

  const handlePresetSelect = (interval: number) => {
    onMilestoneChange(interval);
    onClose();
  };

  const handleCustomSubmit = () => {
    const value = parseInt(customValue);
    if (value >= 5 && value <= 1000) {
      onMilestoneChange(value);
      setCustomValue('');
      onClose();
    } else {
      Alert.alert('Invalid Input', 'Please enter a number between 5 and 1000');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>⚙️ Settings</Text>
          
          <Text style={styles.sectionTitle}>Milestone Interval</Text>
          <Text style={styles.current}>Current: Every {currentMilestone} taps</Text>

          <ScrollView style={styles.presetsContainer}>
            <Text style={styles.presetsTitle}>Quick Presets</Text>
            {presetIntervals.map((interval) => (
              <TouchableOpacity
                key={interval}
                style={[
                  styles.presetButton,
                  currentMilestone === interval && styles.activePreset,
                ]}
                onPress={() => handlePresetSelect(interval)}
              >
                <Text style={styles.presetText}>{interval}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.customContainer}>
            <Text style={styles.sectionTitle}>Custom Interval</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number (5-1000)"
              keyboardType="numeric"
              value={customValue}
              onChangeText={setCustomValue}
            />
            <TouchableOpacity style={styles.customButton} onPress={handleCustomSubmit}>
              <Text style={styles.customButtonText}>Set Custom</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  current: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  presetsContainer: {
    maxHeight: 150,
  },
  presetsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  presetButton: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    marginVertical: 3,
    borderRadius: 8,
    alignItems: 'center',
  },
  activePreset: {
    backgroundColor: '#2196F3',
  },
  presetText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  customContainer: {
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  customButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});