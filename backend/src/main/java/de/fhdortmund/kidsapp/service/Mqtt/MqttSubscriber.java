package de.fhdortmund.kidsapp.service.Mqtt;

import java.sql.Date;
import java.sql.Time;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import de.fhdortmund.kidsapp.model.AnschriftT;
import de.fhdortmund.kidsapp.model.Kompositum.Umfrage;
import de.fhdortmund.kidsapp.model.TerminT;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import de.fhdortmund.kidsapp.model.Veranstaltung.Zahlungsmoeglichkeiten;
import de.fhdortmund.kidsapp.service.UmfrageService;
import de.fhdortmund.kidsapp.service.VeranstaltungService;

public class MqttSubscriber {
    private final String brokerUrl = "tcp://localhost:1883";
    private final IMqttClient client;
    private final ObjectMapper objectMapper;
    private final VeranstaltungService veranstaltungService;
    private final UmfrageService umfrageService;

    public MqttSubscriber(String clientId, VeranstaltungService veranstaltungService, UmfrageService umfrageService) throws MqttException {
        client = new MqttClient(brokerUrl, clientId);
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        // Diese Zeile verhindert, dass Jackson versucht, Zeitstempel als Zahlen zu interpretieren
        this.objectMapper.disable(DeserializationFeature.READ_DATE_TIMESTAMPS_AS_NANOSECONDS);
        this.veranstaltungService = veranstaltungService;
        this.umfrageService = umfrageService;
        client.connect();
    }

    public void subscribe(String topic) throws MqttException {
        client.subscribe(topic, (t, msg) -> {
            String payload = new String(msg.getPayload());
            if ("stadtserver/veranstaltung".equals(t)) {
                try {
                    VeranstaltungBean veranstaltungBean = objectMapper.readValue(payload, VeranstaltungBean.class);
                    
                    Veranstaltung veranstaltung = new Veranstaltung();
                    veranstaltung.setTitel(veranstaltungBean.titel);
                    veranstaltung.setBeschreibung(veranstaltungBean.beschreibung);
                    
                    // Testdaten für die restlichen "nullable = false" Felder
                    veranstaltung.setPreis(10.0);
                    AnschriftT anschrift = new AnschriftT();
                    anschrift.setStrasse("Teststraße");
                    anschrift.setHausnummer(1);
                    anschrift.setPlz(12345);
                    anschrift.setOrt("Teststadt");
                    veranstaltung.setAnschrift(anschrift);
                    veranstaltung.setKategorie("Testkategorie");
                    veranstaltung.setBildUrl("http://example.com/bild.jpg");
                    veranstaltung.setZahlungsmoeglichkeit(Zahlungsmoeglichkeiten.PAYPAL);
                    veranstaltung.setVeranstalter("Testveranstalter");
                    veranstaltung.setVeranstalterEmail("test@example.com");
                    veranstaltung.setVeranstalterTelefon("0123456789");

                    TerminT termin = new TerminT();
                    termin.setDatum(Date.valueOf(veranstaltungBean.datum));
                    termin.setUhrzeitVon(Time.valueOf(veranstaltungBean.uhrzeit));
                    veranstaltung.setTermin(termin);

                    Veranstaltung gespeicherteVeranstaltung = veranstaltungService.saveVeranstaltung(veranstaltung);
                    System.out.println("Veranstaltung erfolgreich empfangen und in der DB gespeichert: " + gespeicherteVeranstaltung.getId());

                } catch (JsonProcessingException e) {
                    System.err.println("Fehler beim Deserialisieren der VeranstaltungsBean: " + e.getMessage());
                }
            } else if ("stadtserver/umfrage".equals(t)) {
                try {
                    UmfrageBean umfrageBean = objectMapper.readValue(payload, UmfrageBean.class);

                    Umfrage umfrage = new Umfrage();
                    // Die ID aus dem Bean ist die Veranstaltungs-ID
                    umfrage.setId(umfrageBean.id); 
                    umfrage.setTitel(umfrageBean.titel);
                    umfrage.setBeschreibung(umfrageBean.beschreibung);

                    Umfrage gespeicherteUmfrage = umfrageService.saveUmfrageForVeranstaltung(umfrage);

                    System.out.println("Umfrage erfolgreich empfangen und gespeichert mit ID: " + gespeicherteUmfrage.getId());
                }
                catch (Exception e) {
                   System.err.println("Fehler beim Verarbeiten der Umfrage: " + e.getMessage()); 
                }
            } 
        });
    }

    public void disconnect() throws MqttException {
        if (client.isConnected()) {
            client.disconnect();
        }
    }
}