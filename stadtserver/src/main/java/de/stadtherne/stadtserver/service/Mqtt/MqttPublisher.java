package de.stadtherne.stadtserver.service.Mqtt;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import de.stadtherne.stadtserver.bean.UmfrageBean;
import de.stadtherne.stadtserver.bean.VeranstaltungBean;

public class MqttPublisher {
    private final String brokerUrl = "tcp://localhost:1883";
    private final IMqttClient client;
    private final ObjectMapper objectMapper;

    public MqttPublisher(String clientId) throws MqttException {
        client = new MqttClient(brokerUrl, clientId);
        client.connect();
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    public void publishMessage(String topic, String payload) throws MqttException {
        MqttMessage message = new MqttMessage(payload.getBytes());
        message.setQos(1);
        client.publish(topic, message);
    }

    public void publishVeranstaltung(String topic, VeranstaltungBean veranstaltung) throws MqttException, JsonProcessingException {
        String payload = objectMapper.writeValueAsString(veranstaltung);
        publishMessage(topic, payload);
    }

    public void publishUmfrage(String topic, UmfrageBean umfrage) throws MqttException, JsonProcessingException {
        String payload = objectMapper.writeValueAsString(umfrage);
        publishMessage(topic, payload);
    }

    public void disconnect() throws MqttException {
        if (client.isConnected()) {
            client.disconnect();
        }
    }
}
