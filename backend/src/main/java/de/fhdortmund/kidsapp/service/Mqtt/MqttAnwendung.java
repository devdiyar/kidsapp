package de.fhdortmund.kidsapp.service.Mqtt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.fhdortmund.kidsapp.service.UmfrageService;
import de.fhdortmund.kidsapp.service.VeranstaltungService;
import jakarta.annotation.PostConstruct;

@Component
public class MqttAnwendung {

    private final VeranstaltungService veranstaltungService;
    private final UmfrageService umfrageService;

    @Autowired
    public MqttAnwendung(VeranstaltungService veranstaltungService, UmfrageService umfrageService) {
        this.veranstaltungService = veranstaltungService;
        this.umfrageService = umfrageService;
    }

    @PostConstruct
    public void StarteMqttAnwendung() {
        try {
            MqttSubscriber subscriber = new MqttSubscriber("kidsapp-backend-subscriber", veranstaltungService, umfrageService);
            subscriber.subscribe("stadtserver/veranstaltung");
            subscriber.subscribe("stadtserver/umfrage");
            System.out.println("MQTT Subscriber gestartet und auf Topics abonniert.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
