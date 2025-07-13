package de.stadtherne.stadtserver.service.Mqtt;

import java.time.LocalDate;
import java.time.LocalTime;

import de.stadtherne.stadtserver.model.Veranstaltung;

public class VeranstaltungBean {
    public String titel;
    public LocalTime uhrzeit;
    public String beschreibung;
    public Long id;
    public LocalDate datum;

    public VeranstaltungBean() {
        
    }

    public VeranstaltungBean(Veranstaltung veranstaltung){
       // titel = veranstaltung.getTitel();
       // datum = veranstaltung.getTermin().getDatum(); // This would need conversion
       // uhrzeit = veranstaltung.getTermin().getUhrzeitVon(); // This would need conversion
       // beschreibung = veranstaltung.getBeschreibung();
       id = veranstaltung.getId();
    }
    
}
