# Repository für die Software-Engineering-Vorlesung

## Beschreibung des Projekts

Ziel dieses Projektes ist die Erstellung einer Anwendung für Kinder und Jugendliche in der Stadt Herne.
Mit Hilfe einer interaktiven Karte ermöglicht diese Anwendung ihnen den Zugang zu Angeboten in ihrer Umgebung.
Außerdem können sie Aktivitäten filtern, ihre Präferenzen speichern, die Angebote bewerten und nach ihnen suchen.

## Team

Teamleiter: Diyar Hasan

Mitglieder: Valentin Stein, Niklas Prinz, Abdul Balhas, Baturalp Kalabalik, Shengliang Wang


## Schnellstart

In diesem Abschnitt werden die Schritte beschrieben, die erforderlich sind, um Ihr Projekt schnell zum Laufen zu bringen:

```bash,ignore
## Beispiel: Starten einer PostgreSQL-Datenbank mit Docker
$ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

# Beispiel: Starten Sie das Projekt (z. B. mit Spring Boot)
$ ./mvnw spring-boot:ru
```

## Voraussetzungen

Geben Sie alle notwendigen Voraussetzungen für die Ausführung Ihres Projekts an, wie z. B:

Betriebssystem: (z.B. Linux, macOS, Windows)

Software: Docker, Java, Maven

Ports: (z. B. Port 8080, falls zutreffend)

## Installation und Einrichtung

Geben Sie eine Schritt-für-Schritt-Anleitung, wie Sie das Repository klonen, das Projekt installieren und konfigurieren:

1. Klonen Sie das Repository:
```bash,ignore
$ git clone https://github.com/devdiyar/kidsapp.git
```

2. Navigieren Sie in das Projektverzeichnis:
```bash,ignore
$ cd kidsapp
```

3. Passen Sie die Konfigurationsdateien an:

Ändern Sie die Konfigurationsdateien (z.B. `.env`, `application.properties`) wie erforderlich.


## Ausführen des Projekts

Erläutern Sie im Detail, wie das Projekt ausgeführt wird, einschließlich:

Starten der Datenbank

Initialisierung der Daten (falls erforderlich, über Skripte)

Starten des Servers

```bash,ignore
# Beispiel: Initialisieren der Datenbank
$ ./init-db.sh

# Das Projekt starten
$ ./mvnw spring-boot:run
```

## Projektstruktur
Geben Sie einen Überblick über die Verzeichnisstruktur, um Mitwirkenden das Navigieren im Projekt zu erleichtern:
````bash,ignore
Projektname/
├── project_one/ # Beschreibung dieses Teilprojekts
├─── docs/ # Dokumentation
├── tests/ # Testfälle
└── README.md # Diese Datei
```