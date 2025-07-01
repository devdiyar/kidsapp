package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class Ausstehend extends Status {
    @Override
    public void liveSetzen(Aktivitaet a) {
        a.setStatus(new Live());
    }
    @Override
    public void geloeschtSetzen(Aktivitaet a) {
        a.setStatus(new Geloescht());
    }
}