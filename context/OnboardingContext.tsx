import React, { createContext, useState, useContext } from 'react';
import { TaskType } from '@/constants/Models';

type ActivityLevel = 'casual' | 'active' | 'hardcore';

interface OnboardingData {
  selectedPaths: TaskType[];
  stats: {
    strength: number;
    intelligence: number;
    charisma: number;
    discipline: number;
  };
  activityLevel: ActivityLevel;
  notificationsEnabled: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateSelectedPaths: (paths: TaskType[]) => void;
  updateStats: (stats: OnboardingData['stats']) => void;
  updateActivityLevel: (level: ActivityLevel) => void;
  updateNotifications: (enabled: boolean) => void;
  resetOnboarding: () => void;
}

const defaultState: OnboardingData = {
  selectedPaths: [],
  stats: {
    strength: 5,
    intelligence: 5,
    charisma: 5,
    discipline: 5,
  },
  activityLevel: 'casual',
  notificationsEnabled: true,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultState);

  const updateSelectedPaths = (paths: TaskType[]) => {
    setData(prev => ({ ...prev, selectedPaths: paths }));
  };

  const updateStats = (stats: OnboardingData['stats']) => {
    setData(prev => ({ ...prev, stats }));
  };

  const updateActivityLevel = (level: ActivityLevel) => {
    setData(prev => ({ ...prev, activityLevel: level }));
  };

  const updateNotifications = (enabled: boolean) => {
    setData(prev => ({ ...prev, notificationsEnabled: enabled }));
  };

  const resetOnboarding = () => {
    setData(defaultState);
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateSelectedPaths,
        updateStats,
        updateActivityLevel,
        updateNotifications,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
} 