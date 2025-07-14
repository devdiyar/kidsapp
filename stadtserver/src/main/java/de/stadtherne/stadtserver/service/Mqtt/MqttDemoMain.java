package de.stadtherne.stadtserver.service.Mqtt;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Scanner;

import de.stadtherne.stadtserver.bean.UmfrageBean;
import de.stadtherne.stadtserver.bean.VeranstaltungBean;

public class MqttDemoMain {

    public void mqttAnwendung() throws Exception {

        //Topic und Nachrichten von Stadtserver zum senden
        String topicStadtserverVeranstaltung = "stadtserver/veranstaltung";
        String topicStadtserverUmfrage = "stadtserver/umfrage";

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
                        veranstaltung.setTitel(scanner.nextLine());

                        System.out.print("Geben Sie die Beschreibung ein: ");
                        veranstaltung.setBeschreibung(scanner.nextLine());

                        String datumString;
                        boolean validDate = false;
                        do {
                            System.out.print("Geben Sie das Datum ein (yyyy-MM-dd): ");
                            datumString = scanner.nextLine();
                            try {
                                veranstaltung.setDatum(LocalDate.parse(datumString));
                                validDate = true;
                            } catch (DateTimeParseException e) {
                                System.out.println("Ungültiges Datumsformat. Bitte yyyy-MM-dd verwenden.");
                                validDate = false;
                            }
                        } while (!validDate);

                        String uhrzeitVon;
                        boolean validUhrzeitVon = false;
                        do {
                            System.out.print("Geben Sie die Uhrzeit ein (HH:mm:ss), wann die Veranstaltung anfaengt:");
                            uhrzeitVon = scanner.nextLine();
                            try {
                                veranstaltung.setUhrzeitVon(LocalTime.parse(uhrzeitVon));
                                validUhrzeitVon = true;
                            } catch (DateTimeParseException e) {
                                System.out.println("Ungültiges Uhrzeitformat. Bitte HH:mm:ss verwenden.");
                                validUhrzeitVon = false;
                            }
                        } while (!validUhrzeitVon);

                        String uhrzeitBis;
                        boolean validUhrzeitBis = false;
                        do {
                            System.out.print("Geben Sie die Uhrzeit ein (HH:mm:ss), wann die Veranstaltung endt:");
                            uhrzeitBis = scanner.nextLine();
                            try {
                                veranstaltung.setUhrzeitBis(LocalTime.parse(uhrzeitBis));
                                validUhrzeitBis = true;
                            } catch (DateTimeParseException e) {
                                System.out.println("Ungültiges Uhrzeitformat. Bitte HH:mm:ss verwenden.");
                                validUhrzeitBis = false;
                            }
                        } while (!validUhrzeitBis);

                        // //Beamter
                        System.out.print("Geben Sie die Straße ein: ");
                        veranstaltung.setStrasse(scanner.nextLine());
                        System.out.print("Geben Sie die Hausnummer ein: ");
                        try {
                            veranstaltung.setHausnummer(Integer.parseInt(scanner.nextLine()));
                        } catch (NumberFormatException e) {
                            System.out.println("Ungültige Hausnummer. Bitte eine Zahl eingeben.");
                            continue;
                        }
                        System.out.print("Geben Sie die PLZ ein: ");
                        try {
                            veranstaltung.setPlz(Integer.parseInt(scanner.nextLine()));
                        } catch (NumberFormatException e) {
                            System.out.println("Ungültige PLZ. Bitte eine Zahl eingeben.");
                            continue;
                        }
                        System.out.print("Geben Sie den Ort ein: ");
                        veranstaltung.setOrt(scanner.nextLine());

                        System.out.print("Geben Sie die Telefonnummer ein: ");
                        try {
                            veranstaltung.setTelefonnummer(Long.parseLong(scanner.nextLine()));
                        } catch (NumberFormatException e) {
                            System.out.println("Ungültige Telefonnummer. Bitte eine Zahl eingeben.");
                            continue;
                        }
                        System.out.print("Geben Sie die E-Mail-Adresse ein: ");
                        veranstaltung.setEmail(scanner.nextLine());

                        System.out.println(veranstaltung.toString());
                        publisherStadtserver.publishVeranstaltung(topicStadtserverVeranstaltung, veranstaltung);
                        System.out.println("VeranstaltungsBean gesendet.");
                    }

                    case "2" -> {
                        UmfrageBean umfrage = new UmfrageBean();
                        System.out.print("Geben Sie die Veranstaltungs-ID ein: ");
                        try {
                            umfrage.setVeranstaltungId(Long.parseLong(scanner.nextLine()));
                        } catch (NumberFormatException e) {
                            System.out.println("Ungültige Veranstaltungs-ID. Bitte eine Zahl eingeben.");
                            continue;
                        }

                        do {
                            System.out.print("Geben Sie den Fragentyp ein(text|sc|mc): ");
                            umfrage.setFragenTyp(scanner.nextLine());
                            System.out.println("Ungültiger Fragentyp. Bitte 'text', 'singleChoise' oder 'multiChoise' eingeben.");

                        } while (!umfrage.getFragenTyp().matches("text|sc|mc"));

                        System.out.print("Geben Sie den Titel der Umfrage ein: ");
                        umfrage.setTitel(scanner.nextLine());
                        System.out.print("Geben Sie die Beschreibung der Umfrage ein: ");
                        umfrage.setBeschreibung(scanner.nextLine());

                        if (umfrage.getFragenTyp().equals("text")) {
                            System.out.print("Geben Sie die Antwort ein: ");
                            String antwort = scanner.nextLine();
                            umfrage.setAntwort(List.of(antwort));
                        } else {
                            System.out.print("Geben Sie die Antworten (durch Kommas getrennt) ein:");
                            String antworten = scanner.nextLine();
                            String[] antwortArray = antworten.split(",");
                            umfrage.setAntwort(List.of(antwortArray));
                        }

                        System.out.println(umfrage.toString());
                        publisherStadtserver.publishUmfrage(topicStadtserverUmfrage, umfrage);
                        System.out.println("UmfrageBean gesendet.");
                    }
                    case "3" -> {
                        running = false;
                        System.out.println("Programm wird beendet.");
                    }
                    default ->
                        System.out.println("Ungültige Eingabe. Bitte versuchen Sie es erneut.");
                }
            }
        }
        publisherStadtserver.disconnect();
        System.exit(0);
    }
}
