package de.stadtherne.stadtserver.service.Mqtt;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;

public class MqttSubscriber {
    private final String brokerUrl = "tcp://localhost:1883";
    private final IMqttClient client;

    public MqttSubscriber(String clientId) throws MqttException {
        client = new MqttClient(brokerUrl, clientId);
        client.connect();
    }

    public void subscribe(String topic) throws MqttException {
        client.subscribe(topic, (t, msg) -> {
            String payload = new String(msg.getPayload());
            if ("backend/veranstaltung".equals(t)) {
                System.out.println("Nachricht auf veranstaltung empfangen: " + payload);
            } else if ("backend/umfrage".equals(t)) {
                System.out.println("Nachricht auf umfrage empfangen: " + payload);
            } 
        });
    }

    public void disconnect() throws MqttException {
        if (client.isConnected()) {
            client.disconnect();
        }
    }
}
