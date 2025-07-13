package de.fhdortmund.kidsapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.fhdortmund.kidsapp.service.Mqtt.MqttAnwendung;

@SpringBootApplication
public class KidsappApplication {

	public static void main(String[] args) {
		SpringApplication.run(KidsappApplication.class, args);

		MqttAnwendung mqtt = new MqttAnwendung();
		mqtt.StarteMqttAnwendung();
	}

}
