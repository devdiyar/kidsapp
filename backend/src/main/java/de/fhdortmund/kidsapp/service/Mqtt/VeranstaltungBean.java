package de.fhdortmund.kidsapp.service.Mqtt;

import java.time.LocalDate;
import java.time.LocalTime;

import de.fhdortmund.kidsapp.model.Veranstaltung;

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
       datum = veranstaltung.getTermin().getDatum().toLocalDate();
       uhrzeit = veranstaltung.getTermin().getUhrzeitVon().toLocalTime();
       // beschreibung = veranstaltung.getBeschreibung();
       id = veranstaltung.getId();
    }
    
}
