package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class Abgeschlossen extends Status {
    @Override
    public void bewertungVerfuegbarSetzen(Veranstaltung veranstaltung) {
        veranstaltung.setStatus(new BewertungVerfuegbar());
    }
}