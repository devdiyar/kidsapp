package de.stadtherne.stadtserver.service.Mqtt;

import java.time.LocalDateTime;
import java.util.Date;

import de.stadtherne.stadtserver.model.Veranstaltung;

public class VeranstaltungBean {
    public String titel;
    public LocalDateTime uhrzeit;
    public String beschreibung;
    public Long id;
    public Date datum;

    public VeranstaltungBean() {
        
    }

    public VeranstaltungBean(Veranstaltung veranstaltung){
       // titel = veranstaltung.getTitel();
       datum = veranstaltung.getTermin().getDatum();
       uhrzeit = veranstaltung.getTermin().getUhrzeit();
       // beschreibung = veranstaltung.getBeschreibung();
       id = veranstaltung.getId();
    }
    
}
