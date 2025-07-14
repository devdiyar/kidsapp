package de.stadtherne.stadtserver.bean;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class VeranstaltungBean {

    private String titel;
    private String beschreibung;
    private LocalDate datum;
    private LocalTime uhrzeitVon;
    private LocalTime uhrzeitBis;
    private String strasse;
    private int hausnummer;
    private int plz;
    private String ort;
    private double preis;
    private Zahlungsmoeglichkeiten zahlungsmoeglichkeit;
    
    public enum Zahlungsmoeglichkeiten {
        BAR, KREDITKARTE, PAYPAL, UEBERWEISUNG
    }
    
    // Veranstalter Kontaktdaten
    private long telefonnummer;
    private String email;

}
