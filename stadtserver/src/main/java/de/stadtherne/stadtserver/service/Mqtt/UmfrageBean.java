package de.stadtherne.stadtserver.service.Mqtt;

import de.stadtherne.stadtserver.model.Umfrage;

public class UmfrageBean {
    
    public long id;
    public String titel;
    public String beschreibung;

    public UmfrageBean() {

    }

    public UmfrageBean(Umfrage umfrage) {
        this.id = umfrage.getId();
        this.titel = umfrage.getTitel();
        this.beschreibung = umfrage.getBeschreibung();
    }

}
