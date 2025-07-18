# Repository für die Software-Engineering-Vorlesung
<img width="1716" height="1200" alt="Thumbnail" src="https://github.com/user-attachments/assets/86747021-3dab-406a-8a6b-db2af740c31e" />

## Beschreibung des Projekts

Ziel dieses Projektes ist die Erstellung einer Anwendung für Kinder und Jugendliche in der Stadt Herne.
Mit Hilfe einer interaktiven Karte ermöglicht diese Anwendung ihnen den Zugang zu Angeboten in ihrer Umgebung.
Außerdem können sie Veranstaltungen filtern, ihre Präferenzen speichern, die Angebote bewerten und nach ihnen suchen.

## Team

Teamleiter: Diyar Hasan

Mitglieder: Valentin Stein, Niklas Prinz, Abdul Balhas, Baturalp Kalabalik, Shengliang Wang


## Voraussetzungen

Stellen Sie sicher, dass die folgende Software auf Ihrem System installiert ist:

*   **Betriebssystem:** Linux oder Windows
*   **Software:**
    *   Docker & Docker Compose (empfohlen)
    *   ODER manuell:
        *   Java 17+
        *   Maven
        *   Node.js & npm (für die Frontend-Entwicklung)
        *   Oracle XE oder PostgreSQL
        *   SQL Developer (optional, für die Datenbankverwaltung)

## Installation und Einrichtung

1.  Klonen Sie das Repository:
    ```bash
    $ git clone https://github.com/devdiyar/kidsapp.git
    ```

2.  Navigieren Sie in das Projektverzeichnis:
    ```bash
    $ cd kidsapp
    ```

3.  Konfiguration (optional):

    Die Standardkonfigurationen für die Entwicklung sind in den jeweiligen `application.properties` der Backend-Dienste (`backend`, `stadtserver`) hinterlegt. Passen Sie diese bei Bedarf an.

## Ausführen des Projekts

### Mit Docker (empfohlen)

1.  **Umgebungsvariablen konfigurieren:**
    ```bash
    $ cp .env.example .env
    ```
    Passen Sie die Werte in `.env` bei Bedarf an.

2.  **Alle Dienste mit Docker Compose starten:**
    ```bash
    $ docker compose up --build
    ```
    
    Oder im Hintergrund:
    ```bash
    $ docker compose up -d --build
    ```

3.  **Dienste wieder stoppen:**
    ```bash
    $ docker compose down
    ```

Die Anwendung ist dann verfügbar unter:
- Backend: http://localhost:8080
- Stadtserver: http://localhost:8082
- Mobile App: http://localhost:19000 (Expo DevTools)
- PostgreSQL Datenbank: localhost:5432

### Manuelles Starten der Dienste


1.  **Stadtserver starten:**
    ```bash
    $ cd stadtserver
    $ ./mvnw spring-boot:run
    ```

2.  **Backend starten:**
    ```bash
    $ cd backend
    $ ./mvnw spring-boot:run
    ```

3.  **Mobile App (Frontend) starten:**
    ```bash
    $ cd mobile
    $ npm install
    $ npm start
    ```

## Projektstruktur
Das Repository ist in drei Hauptkomponenten unterteilt:

```
kidsapp/
├── backend/               # Haupt-Backend-Service (Spring Boot)
├── mobile/                # Mobile Anwendung (React Native / Expo)
├── stadtserver/           # Stadtserver Backend-Service (Spring Boot)
├── docker-compose.yml     # Docker Compose Konfiguration
├── docker-compose.override.yml  # Entwicklungs-Overrides
├── .env.example          # Beispiel Umgebungsvariablen
└── README.md             # Diese Datei
```

## Docker Services

Das Docker Setup beinhaltet folgende Services:

- **db**: PostgreSQL Datenbank für die Entwicklung
- **stadtserver**: Spring Boot Service auf Port 8082
- **backend**: Haupt-Backend Service auf Port 8080
- **mobile**: React Native/Expo App auf Port 19000

Alle Services sind mit Health Checks konfiguriert und starten in der richtigen Reihenfolge.

## Entwicklung

Für die Entwicklung werden automatisch Volume Mounts konfiguriert, sodass Änderungen am Code direkt in die Container übernommen werden:

- Hot Reload für Spring Boot Services aktiviert
- Live Reload für die Mobile App
- Persistente PostgreSQL Daten

## Troubleshooting

**Ports bereits belegt:**
```bash
$ docker compose down
$ docker system prune -f
```

**Container neu erstellen:**
```bash
$ docker compose down
$ docker compose up --build --force-recreate
```

**Logs anzeigen:**
```bash
$ docker compose logs [service_name]
```
