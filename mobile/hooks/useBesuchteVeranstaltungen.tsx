import { useState, useEffect, useCallback } from 'react';
import { veranstaltungService } from '../src/services/veranstaltungService';
import { Veranstaltung } from '../src/types/veranstaltung';
import { useAuth } from '../src/context/authContext';

export interface UseBesuchteVeranstaltungenReturn {
  besuchteVeranstaltungen: Veranstaltung[];
  loading: boolean;
  error: string | null;
  refreshBesuchteVeranstaltungen: () => Promise<void>;
  istBesucht: (veranstaltungId: number) => boolean;
  veranstaltungAlsBesuchtMarkieren: (veranstaltungId: number) => Promise<boolean>;
}

export const useBesuchteVeranstaltungen = (): UseBesuchteVeranstaltungenReturn => {
  const [besuchteVeranstaltungen, setBesuchteVeranstaltungen] = useState<Veranstaltung[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useAuth();

  // Temporär feste Nutzer-ID - später durch echte ID ersetzen
  const nutzerId = 1;

  const loadBesuchteVeranstaltungen = useCallback(async () => {
    if (!state.isAuthenticated) {
      setBesuchteVeranstaltungen([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await veranstaltungService.getBesuchteVeranstaltungen(nutzerId);
      
      if (result.success && result.data) {
        setBesuchteVeranstaltungen(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden der besuchten Veranstaltungen');
        setBesuchteVeranstaltungen([]);
      }
    } catch (err) {
      console.error('Fehler beim Laden der besuchten Veranstaltungen:', err);
      setError('Ein unerwarteter Fehler ist aufgetreten');
      setBesuchteVeranstaltungen([]);
    } finally {
      setLoading(false);
    }
  }, [state.isAuthenticated, nutzerId]);

  useEffect(() => {
    loadBesuchteVeranstaltungen();
  }, [loadBesuchteVeranstaltungen]);

  const refreshBesuchteVeranstaltungen = useCallback(async () => {
    await loadBesuchteVeranstaltungen();
  }, [loadBesuchteVeranstaltungen]);

  const istBesucht = useCallback((veranstaltungId: number): boolean => {
    return besuchteVeranstaltungen.some(veranstaltung => veranstaltung.id === veranstaltungId);
  }, [besuchteVeranstaltungen]);

  const veranstaltungAlsBesuchtMarkieren = useCallback(async (veranstaltungId: number): Promise<boolean> => {
    if (!state.isAuthenticated) {
      setError('Sie müssen angemeldet sein, um Veranstaltungen als besucht zu markieren');
      return false;
    }

    try {
      const success = await veranstaltungService.veranstaltungAlsBesuchtMarkieren(nutzerId, veranstaltungId);
      
      if (success) {
        // Optimistisches Update - die Liste neu laden
        await refreshBesuchteVeranstaltungen();
        return true;
      } else {
        setError('Fehler beim Markieren als besucht');
        return false;
      }
    } catch (err) {
      console.error('Fehler beim Markieren als besucht:', err);
      setError('Ein unerwarteter Fehler ist aufgetreten');
      return false;
    }
  }, [nutzerId, state.isAuthenticated, refreshBesuchteVeranstaltungen]);

  return {
    besuchteVeranstaltungen,
    loading,
    error,
    refreshBesuchteVeranstaltungen,
    istBesucht,
    veranstaltungAlsBesuchtMarkieren,
  };
};

export default useBesuchteVeranstaltungen;
