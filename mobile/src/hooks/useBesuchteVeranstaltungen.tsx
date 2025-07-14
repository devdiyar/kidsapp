import { useState, useEffect, useCallback } from 'react';
import { veranstaltungService } from '../services/veranstaltungService';
import { Veranstaltung } from '../types/veranstaltung';

export const useBesuchteVeranstaltungen = (userId: number | null) => {
  const [veranstaltungen, setVeranstaltungen] = useState<Veranstaltung[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadBesuchteVeranstaltungen = useCallback(async () => {
    if (!userId) {
      setVeranstaltungen([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await veranstaltungService.getBesuchteVeranstaltungen(userId);

      if (result.success && result.data) {
        setVeranstaltungen(result.data);
      } else {
        setError(result.error || 'Fehler beim Laden der besuchten Veranstaltungen');
        setVeranstaltungen([]);
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten');
      setVeranstaltungen([]);
      console.error('Fehler beim Laden der besuchten Veranstaltungen:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refreshBesuchteVeranstaltungen = useCallback(async () => {
    if (!userId) return;

    setRefreshing(true);
    setError(null);

    try {
      const result = await veranstaltungService.getBesuchteVeranstaltungen(userId);

      if (result.success && result.data) {
        setVeranstaltungen(result.data);
      } else {
        setError(result.error || 'Fehler beim Aktualisieren der besuchten Veranstaltungen');
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten');
      console.error('Fehler beim Aktualisieren der besuchten Veranstaltungen:', err);
    } finally {
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    loadBesuchteVeranstaltungen();
  }, [loadBesuchteVeranstaltungen]);

  return {
    veranstaltungen,
    loading,
    error,
    refreshing,
    loadBesuchteVeranstaltungen,
    refreshBesuchteVeranstaltungen,
  };
};
