package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class Live extends Status {
    @Override
    public void abgeschlossenSetzen(Veranstaltung a) {
        a.setStatus(new Abgeschlossen());
    }
}