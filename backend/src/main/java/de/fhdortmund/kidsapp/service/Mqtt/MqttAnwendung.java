package de.fhdortmund.kidsapp.service.Mqtt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.fhdortmund.kidsapp.service.VeranstaltungService;
import jakarta.annotation.PostConstruct;

@Component
public class MqttAnwendung {

    private final VeranstaltungService veranstaltungService;

    @Autowired
    public MqttAnwendung(VeranstaltungService veranstaltungService) {
        this.veranstaltungService = veranstaltungService;
    }

    @PostConstruct
    public void StarteMqttAnwendung() {
        try {
            MqttSubscriber subscriber = new MqttSubscriber("kidsapp-backend-subscriber", veranstaltungService);
            subscriber.subscribe("stadtserver/veranstaltung");
            subscriber.subscribe("stadtserver/umfrage");
            System.out.println("MQTT Subscriber gestartet und auf Topics abonniert.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
