package de.fhdortmund.kidsapp.service.Mqtt;

import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.fhdortmund.kidsapp.service.VeranstaltungService;
import jakarta.annotation.PostConstruct;

@Component
public class MqttAnwendung {

    @Autowired
    private VeranstaltungService veranstaltungService;

    //Topic und Nachrichten von Stadtserver zum empfangen
    String topicStadtserverVeranstaltung = "stadtserver/veranstaltung";
    String topicStadtserverUmfrage = "stadtserver/umfrage";
    MqttSubscriber subscriberBackend;

    @PostConstruct
    public void StarteMqttAnwendung() {

        // Subscriber starten und Topic setzen
        try {
            subscriberBackend = new MqttSubscriber("subscriberClientBackend", veranstaltungService);
            subscriberBackend.subscribe(topicStadtserverVeranstaltung);
            subscriberBackend.subscribe(topicStadtserverUmfrage);
        } catch (MqttException e) {
            System.err.println("Fehler beim erstellen des MqttSubscriber: " + e.getMessage()); 
        }
    }
}
