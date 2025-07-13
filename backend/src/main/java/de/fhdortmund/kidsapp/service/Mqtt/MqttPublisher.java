package de.fhdortmund.kidsapp.service.Mqtt;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

public class MqttPublisher {
    private final String brokerUrl = "tcp://localhost:1883";
    private final IMqttClient client;

    public MqttPublisher(String clientId) throws MqttException {
        client = new MqttClient(brokerUrl, clientId);
        client.connect();
    }

    public void publishMessage(String topic, String payload) throws MqttException {
        MqttMessage message = new MqttMessage(payload.getBytes());
        message.setQos(1);
        client.publish(topic, message);
    }

    public void disconnect() throws MqttException {
        if (client.isConnected()) {
            client.disconnect();
        }
    }
}
