package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class Ausstehend extends Status {
    @Override
    public void liveSetzen(Veranstaltung a) {
        a.setStatus(new Live());
    }
    @Override
    public void geloeschtSetzen(Veranstaltung a) {
        a.setStatus(new Geloescht());
    }
}