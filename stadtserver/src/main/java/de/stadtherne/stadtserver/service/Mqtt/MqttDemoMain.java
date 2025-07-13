package de.stadtherne.stadtserver.service.Mqtt;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.Scanner;

import de.stadtherne.stadtserver.model.Umfrage;

public class MqttDemoMain {
    public void mqttAnwendung() throws Exception {

        //Topic und Nachrichten von Backend zum empfangen
        String topicBackendVeranstaltung = "backend/veranstaltung";
        String topicBackendUmfrage = "backend/umfrage";

        //Topic und Nachrichten von Stadtserver zum senden
        String topicStadtserverVeranstaltung = "stadtserver/veranstaltung";
        String topicStadtserverUmfrage = "stadtserver/umfrage";
        String nachrichtStadtserverUmfrage = "Testdaten für Umfrage";

        // Subscriber starten und Topic setzen
        MqttSubscriber subscriberStadtserver = new MqttSubscriber("subscriberClientStadtserver");
        subscriberStadtserver.subscribe(topicBackendVeranstaltung);
        subscriberStadtserver.subscribe(topicBackendUmfrage);

        // Publisher starten
        MqttPublisher publisherStadtserver = new MqttPublisher("publisherClientStadtserver");

        try (Scanner scanner = new Scanner(System.in)) {
            boolean running = true;
            
            while (running) {
                System.out.println("\nWählen Sie eine Aktion:");
                System.out.println("1: VeranstaltungsBean senden");
                System.out.println("2: UmfrageBean senden");
                System.out.println("3: Programm beenden");
                System.out.print("Ihre Wahl: ");
                
                String choice = scanner.nextLine();
                
                switch (choice) {
                    case "1" -> {
                        VeranstaltungBean veranstaltung = new VeranstaltungBean();
                        
                        System.out.print("Geben Sie den Titel ein: ");
                        veranstaltung.titel = scanner.nextLine();
                        
                        System.out.print("Geben Sie die Beschreibung ein: ");
                        veranstaltung.beschreibung = scanner.nextLine();
                        
                        System.out.print("Geben Sie das Datum ein (yyyy-MM-dd): ");
                        String datumString = scanner.nextLine();
                        try {
                            veranstaltung.datum = LocalDate.parse(datumString);
                        } catch (DateTimeParseException e) {
                            System.out.println("Ungültiges Datumsformat. Bitte yyyy-MM-dd verwenden.");
                            continue;
                        }
                        
                        System.out.print("Geben Sie die Uhrzeit ein (HH:mm:ss): ");
                        String uhrzeitString = scanner.nextLine();
                        try {
                            veranstaltung.uhrzeit = LocalTime.parse(uhrzeitString);
                        } catch (DateTimeParseException e) {
                            System.out.println("Ungültiges Uhrzeitformat. Bitte HH:mm:ss verwenden.");
                            continue;
                        }

                        publisherStadtserver.publishVeranstaltung(topicStadtserverVeranstaltung, veranstaltung);
                        System.out.println("VeranstaltungsBean gesendet.");
                    }
                    case "2" -> {
                        Umfrage umfrage = new Umfrage();
                        
                        System.out.print("Geben Sie die ID der Veranstaltung ein, zu der die Umfrage gehört: ");
                        String idString = scanner.nextLine();
                        try {
                            umfrage.setId(Long.parseLong(idString));
                        } catch (NumberFormatException e) {
                            System.out.println("Ungültige ID. Bitte geben Sie eine Zahl ein.");
                            continue;
                        }
                        
                        System.out.print("Geben Sie den Titel der Umfrage ein: ");
                        umfrage.setTitel(scanner.nextLine());
                        
                        System.out.print("Geben Sie die Beschreibung der Umfrage ein: ");
                        umfrage.setBeschreibung(scanner.nextLine());

                        UmfrageBean umfrageBean = new UmfrageBean(umfrage);

                        publisherStadtserver.publishUmfrage(topicStadtserverUmfrage, umfrageBean);
                        System.out.println("UmfrageBean gesendet.");
                    }
                    case "3" -> {
                        running = false;
                        System.out.println("Programm wird beendet.");
                    }
                    default -> System.out.println("Ungültige Eingabe. Bitte versuchen Sie es erneut.");
                }
            }
        }
        publisherStadtserver.disconnect();
        subscriberStadtserver.disconnect();
        System.exit(0);
    }
}
