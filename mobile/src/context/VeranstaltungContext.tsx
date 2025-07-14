import React, { createContext, useContext, useState } from 'react';
import { Share } from 'react-native';
import Toast from 'react-native-toast-message';

type VeranstaltungContextType = {
  currentVeranstaltungId: string | null;
  isFavorite: boolean;
  setCurrentVeranstaltungId: (id: string | null) => void;
  toggleFavorite: () => void;
  handleShare: () => Promise<void>;
};

const VeranstaltungContext = createContext<VeranstaltungContextType | undefined>(undefined);

export function VeranstaltungProvider({ children }: { children: React.ReactNode }) {
  const [currentVeranstaltungId, setCurrentVeranstaltungId] = useState<string | null>(null);
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
    <VeranstaltungContext.Provider 
      value={{
        currentVeranstaltungId,
        isFavorite,
        setCurrentVeranstaltungId,
        toggleFavorite,
        handleShare,
      }}
    >
      {children}
    </VeranstaltungContext.Provider>
  );
}

export function useVeranstaltung() {
  const context = useContext(VeranstaltungContext);
  if (context === undefined) {
    throw new Error('useVeranstaltung must be used within a VeranstaltungProvider');
  }
  return context;
}
