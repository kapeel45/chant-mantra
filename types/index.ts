export interface TapCounterState {
  count: number;
  isRunning: boolean;
  tapHistory: string[];
  milestoneInterval: number;
}

export interface SettingsProps {
  milestoneInterval: number;
  onMilestoneChange: (interval: number) => void;
}

export interface AppProps {
  // No props for root component
}