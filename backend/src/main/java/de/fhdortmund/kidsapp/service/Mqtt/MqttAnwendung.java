package de.fhdortmund.kidsapp.service.Mqtt;

import org.eclipse.paho.client.mqttv3.MqttException;

public class MqttAnwendung {

	//Topic und Nachrichten von Stadtserver zum empfangen
	String topicStadtserverVeranstaltung = "stadtserver/veranstaltung";
	String topicStadtserverUmfrage = "stadtserver/umfrage";
	MqttSubscriber subscriberBackend;

	public void StarteMqttAnwendung() {

		// Subscriber starten und Topic setzen
		try {
			subscriberBackend = new MqttSubscriber("subscriberClientBackend");
			subscriberBackend.subscribe(topicStadtserverVeranstaltung);
        	subscriberBackend.subscribe(topicStadtserverUmfrage);
		} catch (MqttException e) {
			System.err.println("Fehler beim erstellen des MqttSubscriber: " + e.getMessage()); 
		}
    }
}
