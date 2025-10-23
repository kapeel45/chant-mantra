import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TapCounterState } from '../types';
import { SettingsModal } from './SettingsModal';

interface Props {
  state: TapCounterState;
  onPauseResume: () => void;
  onReset: () => void;
  onMilestoneChange: (interval: number) => void; // NEW
}

export const ControlButtons: React.FC<Props> = ({ 
  state, 
  onPauseResume, 
  onReset,
  onMilestoneChange
}) => {
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <>
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

        <TouchableOpacity 
          style={[styles.button, styles.settingsButton]} 
          onPress={() => setSettingsVisible(true)}
        >
          <Text style={styles.buttonText}>⚙️ Settings</Text>
        </TouchableOpacity>
      </View>

     {/* ✅ FIXED: Pass CORRECT callback */}
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        onMilestoneChange={onMilestoneChange}  // ✅ FIXED: Direct callback
        currentMilestone={state.milestoneInterval}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 80,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  settingsButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});