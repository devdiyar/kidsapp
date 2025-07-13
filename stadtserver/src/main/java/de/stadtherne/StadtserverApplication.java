package de.stadtherne;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.stadtherne.stadtserver.service.Mqtt.MqttDemoMain;

@SpringBootApplication
public class StadtserverApplication {
    public static void main(String[] args) {
        SpringApplication.run(StadtserverApplication.class, args);
        MqttDemoMain m = new MqttDemoMain();
        try {
            m.mqttAnwendung();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}