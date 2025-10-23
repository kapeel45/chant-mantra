import { useState, useEffect } from 'react';
import { Vibration, Alert } from 'react-native';
import { TapCounterState } from '../types';

export const useTapCounter = () => {
  const [state, setState] = useState<TapCounterState>({
    count: 0,
    isRunning: true,
    tapHistory: [],
    milestoneInterval: 108, //Default milestone
  });

  const vibrate = (): void => {
    Vibration.vibrate(10);
  };

  const handleTap = (): void => {
    if (!state.isRunning) return;

    const newCount = state.count + 1;
    setState(prev => ({ ...prev, count: newCount }));
    vibrate();

    const timestamp = new Date().toLocaleTimeString();
    setState(prev => ({
      ...prev,
      tapHistory: [...prev.tapHistory, `${newCount} - ${timestamp}`].slice(-10),
    }));
  };

  const resetCounter = (): void => {
    Alert.alert(
      'Reset Counter',
      'Are you sure you want to reset the counter?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setState({ count: 0, isRunning: true, tapHistory: [], milestoneInterval: state.milestoneInterval });
          },
        },
      ]
    );
  };

  const toggleRunning = (): void => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  // NEW: Update milestone interval
  const updateMilestoneInterval = (interval: number): void => {
    setState(prev => ({ ...prev, milestoneInterval: interval }));
    Alert.alert('Settings Updated', `Milestones set to every ${interval} taps!`);
  };

  useEffect(() => {
    if (state.count > 0 && state.count % state.milestoneInterval === 0) {
      Vibration.vibrate([0, 500, 200, 500]);
      Alert.alert(
        '🎉 Milestone Achieved!',
        `You've tapped ${state.count} times! Keep going!`,
        [{ text: 'Continue Tapping!' }]
      );
    }
  }, [state.count]);

  return {
    state,
    handleTap,
    resetCounter,
    toggleRunning,
  };
};