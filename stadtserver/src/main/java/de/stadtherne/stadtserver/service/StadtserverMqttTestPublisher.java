package de.stadtherne.stadtserver.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import de.stadtherne.stadtserver.bean.UmfrageBean;
import de.stadtherne.stadtserver.bean.VeranstaltungBean;

public class StadtserverMqttTestPublisher {

    private final String brokerUrl = "tcp://localhost:1883";
    private final ObjectMapper objectMapper;

    public StadtserverMqttTestPublisher() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    public VeranstaltungBean createVeranstaltung1_Maerchenstunde() {
        VeranstaltungBean veranstaltung = new VeranstaltungBean();
        veranstaltung.setTitel("Märchenstunde im Stadtpark");
        veranstaltung.setBeschreibung("Eine zauberhafte Märchenstunde für Kinder von 4-8 Jahren im Herzen von Herne");
        veranstaltung.setUhrzeitVon(LocalTime.of(15, 0));
        veranstaltung.setUhrzeitBis(LocalTime.of(16, 30));
        veranstaltung.setDatum(LocalDate.of(2025, 8, 15));
        veranstaltung.setStrasse("Parkstraße");
        veranstaltung.setHausnummer(12);
        veranstaltung.setPlz(44623);
        veranstaltung.setOrt("Herne");
        veranstaltung.setPreis(5.50);
        veranstaltung.setZahlungsmoeglichkeit(VeranstaltungBean.Zahlungsmoeglichkeiten.BAR);
        veranstaltung.setTelefonnummer(2323123456L);
        veranstaltung.setEmail("kinderveranstaltungen@herne.de");
        return veranstaltung;
    }

    public VeranstaltungBean createVeranstaltung2_Kinderflohmarkt() {
        VeranstaltungBean veranstaltung = new VeranstaltungBean();
        veranstaltung.setTitel("Großer Kinderflohmarkt");
        veranstaltung.setBeschreibung("Kinderflohmarkt mit Spielzeug, Büchern und Kleidung auf dem Marktplatz");
        veranstaltung.setUhrzeitVon(LocalTime.of(10, 0));
        veranstaltung.setUhrzeitBis(LocalTime.of(14, 0));
        veranstaltung.setDatum(LocalDate.of(2025, 8, 22));
        veranstaltung.setStrasse("Marktplatz");
        veranstaltung.setHausnummer(1);
        veranstaltung.setPlz(44628);
        veranstaltung.setOrt("Herne");
        veranstaltung.setPreis(0.0);
        veranstaltung.setZahlungsmoeglichkeit(VeranstaltungBean.Zahlungsmoeglichkeiten.BAR);
        veranstaltung.setTelefonnummer(2323765432L);
        veranstaltung.setEmail("flohmarkt@herne.de");
        return veranstaltung;
    }

    public VeranstaltungBean createVeranstaltung3_Bastelnachmittag() {
        VeranstaltungBean veranstaltung = new VeranstaltungBean();
        veranstaltung.setTitel("Kreativer Bastelnachmittag");
        veranstaltung.setBeschreibung("Basteln und Werken für Kinder von 6-12 Jahren im Kulturzentrum");
        veranstaltung.setUhrzeitVon(LocalTime.of(14, 0));
        veranstaltung.setUhrzeitBis(LocalTime.of(17, 0));
        veranstaltung.setDatum(LocalDate.of(2025, 8, 29));
        veranstaltung.setStrasse("Kulturstraße");
        veranstaltung.setHausnummer(25);
        veranstaltung.setPlz(44625);
        veranstaltung.setOrt("Herne");
        veranstaltung.setPreis(8.00);
        veranstaltung.setZahlungsmoeglichkeit(VeranstaltungBean.Zahlungsmoeglichkeiten.BAR);
        veranstaltung.setTelefonnummer(2323345678L);
        veranstaltung.setEmail("basteln@kulturzentrum-herne.de");
        return veranstaltung;
    }

    public VeranstaltungBean createVeranstaltung4_Sportfest() {
        VeranstaltungBean veranstaltung = new VeranstaltungBean();
        veranstaltung.setTitel("Kindersportfest im Stadion");
        veranstaltung.setBeschreibung("Großes Sportfest mit verschiedenen Stationen für Kinder aller Altersgruppen");
        veranstaltung.setUhrzeitVon(LocalTime.of(9, 30));
        veranstaltung.setUhrzeitBis(LocalTime.of(15, 30));
        veranstaltung.setDatum(LocalDate.of(2025, 9, 5));
        veranstaltung.setStrasse("Stadionstraße");
        veranstaltung.setHausnummer(42);
        veranstaltung.setPlz(44629);
        veranstaltung.setOrt("Herne");
        veranstaltung.setPreis(12.50);
        veranstaltung.setZahlungsmoeglichkeit(VeranstaltungBean.Zahlungsmoeglichkeiten.UEBERWEISUNG);
        veranstaltung.setTelefonnummer(2323987654L);
        veranstaltung.setEmail("sport@stadt-herne.de");
        return veranstaltung;
    }

    public VeranstaltungBean createVeranstaltung5_Kinderkonzert() {
        VeranstaltungBean veranstaltung = new VeranstaltungBean();
        veranstaltung.setTitel("Kinderkonzert 'Die Vier Jahreszeiten'");
        veranstaltung.setBeschreibung("Klassisches Kinderkonzert mit interaktiven Elementen in der Stadthalle");
        veranstaltung.setUhrzeitVon(LocalTime.of(16, 0));
        veranstaltung.setUhrzeitBis(LocalTime.of(17, 30));
        veranstaltung.setDatum(LocalDate.of(2025, 9, 12));
        veranstaltung.setStrasse("Am Theater");
        veranstaltung.setHausnummer(5);
        veranstaltung.setPlz(44623);
        veranstaltung.setOrt("Herne");
        veranstaltung.setPreis(15.00);
        veranstaltung.setZahlungsmoeglichkeit(VeranstaltungBean.Zahlungsmoeglichkeiten.UEBERWEISUNG);
        veranstaltung.setTelefonnummer(2323111222L);
        veranstaltung.setEmail("konzerte@stadthalle-herne.de");
        return veranstaltung;
    }

    public UmfrageBean createUmfrage_Bewertung(long veranstaltungId) {
        UmfrageBean umfrage = new UmfrageBean();
        umfrage.setVeranstaltungId(veranstaltungId);
        umfrage.setFragenTyp("sc");
        umfrage.setTitel("Wie hat Ihnen die Veranstaltung gefallen?");
        umfrage.setBeschreibung("Bewerten Sie bitte unsere Veranstaltung");
        umfrage.setAntwort(Arrays.asList(
                "Sehr gut",
                "Gut",
                "Befriedigend",
                "Ausreichend",
                "Mangelhaft"
        ));
        return umfrage;
    }

    public UmfrageBean createUmfrage_Verbesserungen(long veranstaltungId) {
        UmfrageBean umfrage = new UmfrageBean();
        umfrage.setVeranstaltungId(veranstaltungId);
        umfrage.setFragenTyp("mc");
        umfrage.setTitel("Was können wir verbessern?");
        umfrage.setBeschreibung("Mehrfachauswahl möglich - helfen Sie uns besser zu werden!");
        umfrage.setAntwort(Arrays.asList(
                "Mehr Aktivitäten",
                "Bessere Organisation",
                "Längere Dauer",
                "Günstigere Preise",
                "Bessere Location"
        ));
        return umfrage;
    }

    public void sendAllTestVeranstaltungen() {
        try {
            System.out.println("=== STADTSERVER HERNE - MQTT TEST PUBLISHER ===");
            System.out.println("Sende 5 Testveranstaltungen...\n");

            VeranstaltungBean[] veranstaltungen = {
                createVeranstaltung1_Maerchenstunde(),
                createVeranstaltung2_Kinderflohmarkt(),
                createVeranstaltung3_Bastelnachmittag(),
                createVeranstaltung4_Sportfest(),
                createVeranstaltung5_Kinderkonzert()
            };

            for (int i = 0; i < veranstaltungen.length; i++) {
                sendVeranstaltung(veranstaltungen[i], i + 1);
                Thread.sleep(1000);
            }

            System.out.println("Alle 5 Veranstaltungen gesendet!");

        } catch (Exception e) {
            System.err.println("Fehler beim Senden der Veranstaltungen: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void sendAllTestUmfragen() {
        try {
            System.out.println("\nSende Test-Umfragen...\n");

            for (long veranstaltungId = 1L; veranstaltungId <= 5L; veranstaltungId++) {
                sendUmfrage(createUmfrage_Bewertung(veranstaltungId), (int) veranstaltungId, "Bewertung");
                Thread.sleep(500);

                if (veranstaltungId % 2 == 1) {
                    sendUmfrage(createUmfrage_Verbesserungen(veranstaltungId), (int) veranstaltungId, "Verbesserung");
                    Thread.sleep(500);
                }
            }

            System.out.println("Alle Umfragen gesendet!");

        } catch (Exception e) {
            System.err.println("Fehler beim Senden der Umfragen: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void sendVeranstaltung(VeranstaltungBean veranstaltung, int nummer) throws Exception {
        IMqttClient client = new MqttClient(brokerUrl, "stadtserver-publisher-" + nummer);
        client.connect();

        String json = objectMapper.writeValueAsString(veranstaltung);
        MqttMessage message = new MqttMessage(json.getBytes());
        message.setQos(1);

        client.publish("stadtserver/veranstaltung", message);
        System.out.println("Veranstaltung " + nummer + " gesendet: " + veranstaltung.getTitel());

        client.disconnect();
    }

    private void sendUmfrage(UmfrageBean umfrage, int veranstaltungNr, String typ) throws Exception {
        IMqttClient client = new MqttClient(brokerUrl, "stadtserver-umfrage-" + veranstaltungNr + "-" + typ);
        client.connect();

        String json = objectMapper.writeValueAsString(umfrage);
        MqttMessage message = new MqttMessage(json.getBytes());
        message.setQos(1);

        client.publish("stadtserver/umfrage", message);
        System.out.println("Umfrage gesendet für Veranstaltung " + veranstaltungNr + " (" + typ + "): " + umfrage.getTitel());

        client.disconnect();
    }

    public static void main(String[] args) {
        StadtserverMqttTestPublisher publisher = new StadtserverMqttTestPublisher();

        try {
            publisher.sendAllTestVeranstaltungen();

            Thread.sleep(3000);

            publisher.sendAllTestUmfragen();

            System.out.println("\n STADTSERVER TEST KOMPLETT! ");

        } catch (Exception e) {
            System.err.println("Fehler beim Ausführen des Tests: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
