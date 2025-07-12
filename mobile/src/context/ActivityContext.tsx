import React, { createContext, useContext, useState } from 'react';
import { Share } from 'react-native';
import Toast from 'react-native-toast-message';

type ActivityContextType = {
  currentActivityId: string | null;
  isFavorite: boolean;
  setCurrentActivityId: (id: string | null) => void;
  toggleFavorite: () => void;
  handleShare: () => Promise<void>;
};

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    Toast.show({
      type: newFavoriteState ? 'success' : 'info',
      text1: newFavoriteState
        ? 'Zur Favoritenliste hinzugefügt'
        : 'Von Favoriten entfernt',
      position: 'top'
    });
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Schau dir dieses Event an!`,
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Toast.show({
        type: 'error',
        text1: 'Fehler beim Teilen',
        text2: 'Bitte versuche es später erneut.',
        position: 'top',
      });
    }
  };

  return (
    <ActivityContext.Provider 
      value={{
        currentActivityId,
        isFavorite,
        setCurrentActivityId,
        toggleFavorite,
        handleShare,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}
