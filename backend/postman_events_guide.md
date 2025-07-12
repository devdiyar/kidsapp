# Anleitung zur Verwaltung von Veranstaltungen mit Postman

## Voraussetzungen
- Postman installiert
- Backend-Server läuft lokal auf Port 8080

## API-Endpunkte

### 1. Veranstaltungen erstellen
```
POST http://localhost:8080/api/veranstaltungen
Content-Type: application/json

{
    "titel": "Kindergeburtstag",
    "beschreibung": "Feier für Max",
    "preis": 25.0,
    "anschrift": {
        "strasse": "Spielplatzweg",
        "hausnummer": 1,
        "plz": 44137,
        "ort": "Dortmund"
    },
    "termin": {
        "datum": "2025-07-07T17:34:05.142Z",
        "uhrzeitVon": "2025-07-07T17:34:05.142Z",
        "uhrzeitBis": "2025-07-07T19:34:05.142Z"
    },
    "teilnehmer": null,
    "umfrage": null,
    "bewertungen": [],
    "aktuellerstatus": {
        "veranstaltung": null
    }
}
```

### 2. Alle Veranstaltungen abrufen
```
GET http://localhost:8080/api/veranstaltungen
```

### 3. Einzelne Veranstaltung abrufen
```
GET http://localhost:8080/api/veranstaltungen/{id}
```

### 4. Veranstaltung aktualisieren
```
PUT http://localhost:8080/api/veranstaltungen/{id}
Content-Type: application/json

{
    "titel": "Kindergeburtstag Update",
    "beschreibung": "Feier für Max und Freunde",
    "preis": 30.0,
    "anschrift": {
        "strasse": "Spielplatzweg",
        "hausnummer": 1,
        "plz": 44137,
        "ort": "Dortmund"
    },
    "termin": {
        "datum": "2025-07-07T17:34:05.142Z",
        "uhrzeitVon": "2025-07-07T17:34:05.142Z",
        "uhrzeitBis": "2025-07-07T19:34:05.142Z"
    },
    "teilnehmer": null,
    "umfrage": null,
    "bewertungen": []
}
```

### 5. Veranstaltung löschen
```
DELETE http://localhost:8080/api/veranstaltungen/{id}
```

## Veranstaltungsdetails

### Pflichtfelder
- titel (String)
- beschreibung (String)
- preis (double)
- anschrift (Objekt)
  - strasse (String)
  - hausnummer (int)
  - plz (int)
  - ort (String)
- termin (Objekt)
  - datum (ISO 8601 Format: "YYYY-MM-DDThh:mm:ss.sssZ")
  - uhrzeitVon (ISO 8601 Format: "YYYY-MM-DDThh:mm:ss.sssZ")
  - uhrzeitBis (ISO 8601 Format: "YYYY-MM-DDThh:mm:ss.sssZ")

### Optionale Felder
- teilnehmer (RegistrierterNutzer, kann null sein)
  - id (long)
  - vorname (String)
  - nachname (String)
  - anschrift (Objekt)
    - strasse (String)
    - hausnummer (int)
    - plz (int)
    - ort (String)
  - aktivitaeten (Liste von String)
- bewertungen (Liste von Bewertungen, kann leer sein)
  - id (long)
  - steranzahl (int)
  - kommentar (String)
  - bewerter (RegistrierterNutzer)
  - veranstaltung (String)
- umfrage (Objekt, kann null sein)
  - id (long)
  - titel (String)
  - beschreibung (String)
  - umfrage (String)
  - fragentypen (Liste von Fragentyp)
    - id (long)
    - titel (String)
    - beschreibung (String)
    - umfrage (String)
  - veranstaltung (String)
- aktuellerstatus (Objekt)
  - id (long)
  - veranstaltung (String)

### Status-Lebenszyklus
Eine Veranstaltung durchläuft folgende Status:
1. AUSSTEHEND (Initialstatus bei Erstellung)
2. STATTFINDEND
3. LIVE
4. ABGESCHLOSSEN
5. GELOESCHT

Die Status-Änderungen erfolgen über spezielle Methoden:
- ausstehendSetzen()
- stattfindendSetzen()
- liveSetzen()
- abgeschlossenSetzen()
- geloeschtSetzen()

### Bewertungssystem
Veranstaltungen können bewertet werden mit:
- Sternanzahl (int)
- Kommentar (String)
- Bewerter (RegistrierterNutzer)

Methode zum Erstellen einer Bewertung:
```
bewertungErstellen(int steranzahl, String kommentar, RegistrierterNutzer bewerter)
```

## Fehlerbehandlung

### HTTP-Statuscodes
- 200: Erfolgreiche Anfrage
- 201: Erfolgreich erstellt
- 404: Veranstaltung nicht gefunden
- 400: Ungültige Anfrage

### Fehlermeldungen
- "Veranstaltung nicht gefunden" - wenn die ID nicht existiert
- "Ungültiger Status" - wenn ein ungültiger Status-Typ angegeben wird
- Status-spezifische Fehlermeldungen bei ungültigen Status-Übergängen
- "JSON parse error" - wenn das JSON-Format nicht korrekt ist

## Tipps für Postman
- Erstellen Sie eine Collection für alle Veranstaltungs-Endpoints
- Nutzen Sie Umgebungsvariablen für die Base-URL
- Speichern Sie häufig verwendete IDs als Variablen
- Testen Sie den kompletten Status-Lebenszyklus einer Veranstaltung
- Achten Sie auf das korrekte Datumsformat (ISO 8601)