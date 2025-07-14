import { useState, useEffect, useCallback } from 'react';
import { veranstaltungService } from '../src/services/veranstaltungService';
import { Veranstaltung } from '../src/types/veranstaltung';
import { useAuth } from '../src/context/authContext';

export interface UseFavoritenReturn {
  favoriten: Veranstaltung[];
  loading: boolean;
  error: string | null;
  refreshFavoriten: () => Promise<void>;
  istFavorit: (veranstaltungId: number) => boolean;
  favoritHinzufuegen: (veranstaltungId: number) => Promise<boolean>;
  favoritEntfernen: (veranstaltungId: number) => Promise<boolean>;
  toggleFavorit: (veranstaltungId: number) => Promise<boolean>;
}

export const useFavoriten = (): UseFavoritenReturn => {
  const [favoriten, setFavoriten] = useState<Veranstaltung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();

  // Temporär feste Nutzer-ID - später durch echte ID ersetzen
  const nutzerId = 1;

  const loadFavoriten = useCallback(async () => {
    if (!state.isAuthenticated) {
      setFavoriten([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await veranstaltungService.getFavoriten(nutzerId);
      
      if (result.success && result.data) {
        setFavoriten(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden der Favoriten');
        setFavoriten([]);
      }
    } catch (err) {
      console.error('Fehler beim Laden der Favoriten:', err);
      setError('Ein unerwarteter Fehler ist aufgetreten');
      setFavoriten([]);
    } finally {
      setLoading(false);
    }
  }, [state.isAuthenticated, nutzerId]);

  useEffect(() => {
    loadFavoriten();
  }, [loadFavoriten]);

  const refreshFavoriten = useCallback(async () => {
    await loadFavoriten();
  }, [loadFavoriten]);

  const istFavorit = useCallback((veranstaltungId: number): boolean => {
    return favoriten.some(fav => fav.id === veranstaltungId);
  }, [favoriten]);

  const favoritHinzufuegen = useCallback(async (veranstaltungId: number): Promise<boolean> => {
    if (!state.isAuthenticated) {
      setError('Sie müssen angemeldet sein, um Favoriten zu verwalten');
      return false;
    }

    try {
      const success = await veranstaltungService.favoritHinzufuegen(nutzerId, veranstaltungId);
      
      if (success) {
        // Optimistisches Update - hinzufügen ohne Server-Roundtrip
        await refreshFavoriten();
        return true;
      } else {
        setError('Fehler beim Hinzufügen des Favoriten');
        return false;
      }
    } catch (err) {
      console.error('Fehler beim Hinzufügen des Favoriten:', err);
      setError('Ein unerwarteter Fehler ist aufgetreten');
      return false;
    }
  }, [nutzerId, state.isAuthenticated, refreshFavoriten]);

  const favoritEntfernen = useCallback(async (veranstaltungId: number): Promise<boolean> => {
    if (!state.isAuthenticated) {
      setError('Sie müssen angemeldet sein, um Favoriten zu verwalten');
      return false;
    }

    try {
      const success = await veranstaltungService.favoritEntfernen(nutzerId, veranstaltungId);
      
      if (success) {
        // Optimistisches Update - entfernen ohne Server-Roundtrip
        setFavoriten(prev => prev.filter(fav => fav.id !== veranstaltungId));
        return true;
      } else {
        setError('Fehler beim Entfernen des Favoriten');
        return false;
      }
    } catch (err) {
      console.error('Fehler beim Entfernen des Favoriten:', err);
      setError('Ein unerwarteter Fehler ist aufgetreten');
      return false;
    }
  }, [nutzerId, state.isAuthenticated]);

  const toggleFavorit = useCallback(async (veranstaltungId: number): Promise<boolean> => {
    if (istFavorit(veranstaltungId)) {
      return await favoritEntfernen(veranstaltungId);
    } else {
      return await favoritHinzufuegen(veranstaltungId);
    }
  }, [istFavorit, favoritEntfernen, favoritHinzufuegen]);

  return {
    favoriten,
    loading,
    error,
    refreshFavoriten,
    istFavorit,
    favoritHinzufuegen,
    favoritEntfernen,
    toggleFavorit,
  };
};

export default useFavoriten;
