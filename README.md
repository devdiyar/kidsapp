# Repository für die Software-Engineering-Vorlesung

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
    *   Java 17+
    *   Maven
    *   Node.js & npm (für die Frontend-Entwicklung)
    *   Oracle XE
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

Sie müssen die Dienste manuell starten.

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
├── backend/         # Haupt-Backend-Service (Spring Boot)
├── mobile/          # Mobile Anwendung (React Native / Expo)
├── stadtserver/     # Stadtserver Backend-Service (Spring Boot)
└── README.md        # Diese Datei
```