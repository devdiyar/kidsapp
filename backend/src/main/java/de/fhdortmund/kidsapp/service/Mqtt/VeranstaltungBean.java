package de.fhdortmund.kidsapp.service.Mqtt;

import java.util.Date;

import de.fhdortmund.kidsapp.model.Veranstaltung;

public class VeranstaltungBean {
    public String titel;
    public Date uhrzeit;
    public String beschreibung;
    public Long id;
    public Date datum;

    public VeranstaltungBean() {
    }

    public VeranstaltungBean(Veranstaltung veranstaltung){
       // titel = veranstaltung.getTitel();
       datum = veranstaltung.getTermin().getDatum();
       uhrzeit = veranstaltung.getTermin().getUhrzeitVon();
       // beschreibung = veranstaltung.getBeschreibung();
       id = veranstaltung.getId();
    }
    
}
