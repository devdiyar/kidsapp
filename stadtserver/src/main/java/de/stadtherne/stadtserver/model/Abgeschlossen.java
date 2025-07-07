package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class Abgeschlossen extends Status {
    public Abgeschlossen() {
    }

    public Abgeschlossen(Veranstaltung v) {
        super(v);
    }

    @Override
    public void abgeschlossenSetzen() {
        veranstaltung.setStatus(new Abgeschlossen(veranstaltung));
    }

    @Override
    public void liveSetzen() {
        veranstaltung.setStatus(new Live(veranstaltung));

    }

    @Override
    public void ausstehendSetzen() {
        veranstaltung.setStatus(new Ausstehend(veranstaltung));

    }

    @Override
    public void stattfindendSetzen() {
        veranstaltung.setStatus(new Stattfindend(veranstaltung));

    }

    @Override
    public void geloeschtSetzen() {
        veranstaltung.setStatus(new Geloescht(veranstaltung));

    }
}