package de.stadtherne.stadtserver.service.Mqtt;

import java.time.LocalDate;
import java.time.LocalTime;

public class VeranstaltungBean {
    public String titel;
    public LocalTime uhrzeit;
    public String beschreibung;
    public Long id;
    public LocalDate datum;

    public VeranstaltungBean() {
        
    }
    
}
