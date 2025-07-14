import { useState, useEffect, useCallback } from 'react';
import { veranstaltungService } from '../src/services/veranstaltungService';
import { Veranstaltung } from '../src/types/veranstaltung';
import { useAuth } from '../src/context/authContext';

export interface UseAngemeldeteVeranstaltungenReturn {
  angemeldeteVeranstaltungen: Veranstaltung[];
  loading: boolean;
  error: string | null;
  refreshAngemeldeteVeranstaltungen: () => Promise<void>;
  istAngemeldet: (veranstaltungId: number) => boolean;
}

export const useAngemeldeteVeranstaltungen = (): UseAngemeldeteVeranstaltungenReturn => {
  const [angemeldeteVeranstaltungen, setAngemeldeteVeranstaltungen] = useState<Veranstaltung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();

  // Temporär feste Nutzer-ID - später durch echte ID ersetzen
  const nutzerId = 1;

  const loadAngemeldeteVeranstaltungen = useCallback(async () => {
    if (!state.isAuthenticated) {
      setAngemeldeteVeranstaltungen([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await veranstaltungService.getAngemeldeteVeranstaltungen(nutzerId);
      
      if (result.success && result.data) {
        setAngemeldeteVeranstaltungen(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden der angemeldeten Veranstaltungen');
        setAngemeldeteVeranstaltungen([]);
      }
    } catch (err) {
      console.error('Fehler beim Laden der angemeldeten Veranstaltungen:', err);
      setError('Ein unerwarteter Fehler ist aufgetreten');
      setAngemeldeteVeranstaltungen([]);
    } finally {
      setLoading(false);
    }
  }, [state.isAuthenticated, nutzerId]);

  useEffect(() => {
    loadAngemeldeteVeranstaltungen();
  }, [loadAngemeldeteVeranstaltungen]);

  const refreshAngemeldeteVeranstaltungen = useCallback(async () => {
    await loadAngemeldeteVeranstaltungen();
  }, [loadAngemeldeteVeranstaltungen]);

  const istAngemeldet = useCallback((veranstaltungId: number): boolean => {
    return angemeldeteVeranstaltungen.some(veranstaltung => veranstaltung.id === veranstaltungId);
  }, [angemeldeteVeranstaltungen]);

  return {
    angemeldeteVeranstaltungen,
    loading,
    error,
    refreshAngemeldeteVeranstaltungen,
    istAngemeldet,
  };
};

export default useAngemeldeteVeranstaltungen;
