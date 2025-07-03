package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class BewertungVerfuegbar extends Status {
    @Override
    public void umfrageVerfuegbarSetzen(Veranstaltung veranstaltung) {
        veranstaltung.setStatus(new UmfrageVerfuegbarStatus());
    }
}