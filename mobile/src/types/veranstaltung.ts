export interface Veranstaltung {
  id: number;
  titel: string;
  beschreibung: string;
  preis: number;
  anschrift: Anschrift;
  bildUrl: string;
  veranstalter: string;
  veranstalterEmail: string;
  veranstalterTelefon: string;
  zahlungsmoeglichkeit: "BAR" | "KREDITKARTE" | "PAYPAL" | "UEBERWEISUNG";
  termin: Termin;
  teilnehmer?: any[];
  aktuellerstatus?: any;
  startZeit: string;
  endZeit: string;
  maxTeilnehmer: number;
  aktuellerTeilnehmeranzahl: number;
}

export interface Anschrift {
  strasse: string;
  hausnummer: number;
  plz: number;
  ort: string;
}

export interface Termin {
  datum: string;
  uhrzeitVon: string;
  uhrzeitBis: string;
}

export interface VeranstaltungResult<T = Veranstaltung[]> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface VeranstaltungAnmeldungResult {
  success: boolean;
  message?: string;
  error?: string;
}
