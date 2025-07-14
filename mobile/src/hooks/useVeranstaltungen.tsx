import { useState, useEffect, useCallback } from "react";
import { veranstaltungService } from "../services/veranstaltungService";
import { Veranstaltung } from "../types/veranstaltung";

export const useVeranstaltungen = () => {
  const [veranstaltungen, setVeranstaltungen] = useState<Veranstaltung[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Veranstaltungen laden
  const loadVeranstaltungen = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await veranstaltungService.getAlleVeranstaltungen();

      if (result.success && result.data) {
        setVeranstaltungen(result.data);
      } else {
        setError(result.error || "Fehler beim Laden der Veranstaltungen");
        setVeranstaltungen([]);
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten");
      setVeranstaltungen([]);
      console.error("Fehler beim Laden der Veranstaltungen:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh für Pull-to-Refresh
  const refreshVeranstaltungen = useCallback(async () => {
    setRefreshing(true);
    setError(null);

    try {
      const result = await veranstaltungService.getAlleVeranstaltungen();

      if (result.success && result.data) {
        setVeranstaltungen(result.data);
      } else {
        setError(
          result.error || "Fehler beim Aktualisieren der Veranstaltungen"
        );
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten");
      console.error("Fehler beim Aktualisieren der Veranstaltungen:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Initiales Laden
  useEffect(() => {
    loadVeranstaltungen();
  }, [loadVeranstaltungen]);

  return {
    veranstaltungen,
    loading,
    error,
    refreshing,
    loadVeranstaltungen,
    refreshVeranstaltungen,
  };
};

export const useVeranstaltung = (id: number | null) => {
  const [veranstaltung, setVeranstaltung] = useState<Veranstaltung | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadVeranstaltung = useCallback(async () => {
    if (!id || id <= 0) {
      setVeranstaltung(null);
      setError("Ungültige Veranstaltungs-ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await veranstaltungService.getVeranstaltungById(id);

      if (result.success && result.data) {
        setVeranstaltung(result.data);
      } else {
        setVeranstaltung(null);
        setError(result.error || "Veranstaltung nicht gefunden");
      }
    } catch (err) {
      setVeranstaltung(null);
      setError("Ein unerwarteter Fehler ist aufgetreten");
      console.error("Fehler beim Laden der Veranstaltung:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadVeranstaltung();
  }, [loadVeranstaltung]);

  return {
    veranstaltung,
    loading,
    error,
    loadVeranstaltung,
  };
};

export const useVeranstaltungAnmeldung = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const anmelden = useCallback(
    async (nutzerId: number, veranstaltungId: number): Promise<boolean> => {
      if (
        !nutzerId ||
        nutzerId <= 0 ||
        !veranstaltungId ||
        veranstaltungId <= 0
      ) {
        setError("Ungültige Nutzer- oder Veranstaltungs-ID");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await veranstaltungService.anmeldenZuVeranstaltung(
          nutzerId,
          veranstaltungId
        );

        if (result.success) {
          return true;
        } else {
          setError(result.error || "Anmeldung fehlgeschlagen");
          return false;
        }
      } catch (err) {
        setError("Ein unerwarteter Fehler ist aufgetreten");
        console.error("Fehler bei der Anmeldung:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const abmelden = useCallback(
    async (nutzerId: number, veranstaltungId: number): Promise<boolean> => {
      if (
        !nutzerId ||
        nutzerId <= 0 ||
        !veranstaltungId ||
        veranstaltungId <= 0
      ) {
        setError("Ungültige Nutzer- oder Veranstaltungs-ID");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await veranstaltungService.abmeldenVonVeranstaltung(
          nutzerId,
          veranstaltungId
        );

        if (result.success) {
          return true;
        } else {
          setError(result.error || "Abmeldung fehlgeschlagen");
          return false;
        }
      } catch (err) {
        setError("Ein unerwarteter Fehler ist aufgetreten");
        console.error("Fehler bei der Abmeldung:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    anmelden,
    abmelden,
  };
};
