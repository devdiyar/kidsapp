package de.fhdortmund.kidsapp.service.Mqtt;

import java.sql.Date;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import de.fhdortmund.kidsapp.model.AnschriftT;
import de.fhdortmund.kidsapp.model.Kompositum.Fragentyp;
import de.fhdortmund.kidsapp.model.Kompositum.MultiChoice;
import de.fhdortmund.kidsapp.model.Kompositum.SingleChoice;
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
                    veranstaltung.setTitel(veranstaltungBean.getTitel());
                    veranstaltung.setBeschreibung(veranstaltungBean.getBeschreibung());
                    veranstaltung.setPreis(veranstaltungBean.getPreis());
                    veranstaltung.setZahlungsmoeglichkeit(Zahlungsmoeglichkeiten.valueOf(veranstaltungBean.getZahlungsmoeglichkeit().name()));
                    veranstaltung.setVeranstalterTelefon(veranstaltungBean.getTelefonnummer());
                    veranstaltung.setVeranstalterEmail(veranstaltungBean.getEmail());

                    veranstaltung.setVeranstalter("Stadt Herne");
                    veranstaltung.setBildUrl("https://example.com/placeholder.jpg");

                    AnschriftT anschrift = new AnschriftT();
                    anschrift.setStrasse(veranstaltungBean.getStrasse());
                    anschrift.setHausnummer(veranstaltungBean.getHausnummer());
                    anschrift.setPlz(veranstaltungBean.getPlz());
                    anschrift.setOrt(veranstaltungBean.getOrt());
                    veranstaltung.setAnschrift(anschrift);

                    TerminT termin = new TerminT();
                    termin.setDatum(Date.valueOf(veranstaltungBean.getDatum()));
                    termin.setUhrzeitVon(veranstaltungBean.getUhrzeitVon());
                    termin.setUhrzeitBis(veranstaltungBean.getUhrzeitBis());
                    veranstaltung.setTermin(termin);

                    try {
                        Veranstaltung gespeicherteVeranstaltung = veranstaltungService.saveVeranstaltung(veranstaltung);
                        System.out.println("Veranstaltung erfolgreich empfangen und in der DB gespeichert: " + gespeicherteVeranstaltung.getId());
                    } catch (Exception saveException) {
                        System.err.println("FEHLER beim Speichern der Veranstaltung: " + saveException.getMessage());
                        saveException.printStackTrace();
                    }

                } catch (JsonProcessingException e) {
                    System.err.println("Fehler beim Deserialisieren der VeranstaltungsBean: " + e.getMessage());
                } catch (Exception e) {
                    System.err.println("Allgemeiner Fehler beim Verarbeiten der Veranstaltung: " + e.getMessage());
                    e.printStackTrace();
                }
            } else if ("stadtserver/umfrage".equals(t)) {
                try {
                    UmfrageBean umfrageBean = objectMapper.readValue(payload, UmfrageBean.class);
                    Fragentyp frage = null;
                    if (umfrageBean.getFragenTyp().equals("sc")) {
                        frage = new SingleChoice();
                        ((SingleChoice) frage).setAntwortoptionen(umfrageBean.getAntwort());
                        frage.setTitel(umfrageBean.getTitel());
                    } else if (umfrageBean.getFragenTyp().equals("mc")) {
                        frage = new MultiChoice();
                        ((MultiChoice) frage).setAntwortoptionen(umfrageBean.getAntwort());
                        frage.setTitel(umfrageBean.getTitel());
                        frage.setBeschreibung(umfrageBean.getBeschreibung());
                    }

                    Umfrage umfrage = new Umfrage();
                    umfrage.setVeranstaltungId(umfrageBean.getVeranstaltungId());
                    umfrage.add(frage);

                    Umfrage gespeicherteUmfrage = umfrageService.saveUmfrageForVeranstaltung(umfrage);

                } catch (Exception e) {
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
