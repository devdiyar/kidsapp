package de.fhdortmund.kidsapp.service.Mqtt;

public class MqttDemoMain {
    public static void main(String[] args) throws Exception {

        //Topic und Nachrichten von Backend zum senden
        String topicBackendVeranstaltung = "backend/veranstaltung";
        String nachrichtBackendVerwanstaltung = "Testdaten für Veranstaltung";
        String topicBackendUmfrage = "backend/umfrage";
        String nachrichtBackendUmfrage = "Testdaten für Umfrage";

        //Topic und Nachrichten von Stadtserver zum empfangen
        String topicStadtserverVeranstaltung = "stadtserver/veranstaltung";
        String topicStadtserverUmfrage = "stadtserver/umfrage";

        // Subscriber starten und Topic setzen
        MqttSubscriber subscriberBackend = new MqttSubscriber("subscriberClientBackend");
        subscriberBackend.subscribe(topicStadtserverVeranstaltung);
        subscriberBackend.subscribe(topicStadtserverUmfrage);

        // Publisher starten und Nachrichten senden
        MqttPublisher publisherBackend = new MqttPublisher("publisherClientBackend");
        publisherBackend.publishMessage(topicBackendVeranstaltung, nachrichtBackendVerwanstaltung);
        publisherBackend.publishMessage(topicBackendUmfrage, nachrichtBackendUmfrage);
    }
}
