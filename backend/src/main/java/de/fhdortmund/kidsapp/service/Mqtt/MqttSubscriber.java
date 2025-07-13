package de.fhdortmund.kidsapp.service.Mqtt;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import de.fhdortmund.kidsapp.model.Kompositum.Umfrage;
import de.fhdortmund.kidsapp.model.TerminT;
import de.fhdortmund.kidsapp.model.Veranstaltung;
public class MqttSubscriber {
    private final String brokerUrl = "tcp://localhost:1883";
    private final IMqttClient client;
    private final ObjectMapper objectMapper;

    public MqttSubscriber(String clientId) throws MqttException {
        client = new MqttClient(brokerUrl, clientId);
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        client.connect();
    }

    public void subscribe(String topic) throws MqttException {
        client.subscribe(topic, (t, msg) -> {
            String payload = new String(msg.getPayload());
            if ("stadtserver/veranstaltung".equals(t)) {
                try {
                    VeranstaltungBean veranstaltungBean = objectMapper.readValue(payload, VeranstaltungBean.class);
                    
                    Veranstaltung veranstaltung = new Veranstaltung();
                    veranstaltung.setId(veranstaltungBean.id);
                    // veranstaltung.setTitel(veranstaltungBean.titel);
                    // veranstaltung.setBeschreibung(veranstaltungBean.beschreibung);
                    
                    TerminT termin = new TerminT();
                    termin.setDatum(veranstaltungBean.datum);
                    termin.setUhrzeitVon(veranstaltungBean.uhrzeit);
                    veranstaltung.setTermin(termin);

                    System.out.println("Veranstaltung erfolgreich empfangen und erstellt: " + veranstaltung.getId());

                } catch (JsonProcessingException e) {
                    System.err.println("Fehler beim Deserialisieren der VeranstaltungsBean: " + e.getMessage());
                }
            } else if ("stadtserver/umfrage".equals(t)) {
                try {
                    UmfrageBean umfrageBean = objectMapper.readValue(payload, UmfrageBean.class);

                    Umfrage umfrage = new Umfrage();
                    umfrage.setId(umfrageBean.id);
                    umfrage.setTitel(umfrageBean.titel);
                    umfrage.setBeschreibung(umfrageBean.beschreibung);

                    System.out.println("Umfrage erfolgreich empfangen und erstellt:" +umfrage.getId());
                }
                catch (JsonProcessingException e) {
                   System.err.println("Fehler beim Deserialisieren der VeranstaltungsBean: " + e.getMessage()); 
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