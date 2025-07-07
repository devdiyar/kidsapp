package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class Geloescht extends Status {
    public Geloescht() {
    }

    public Geloescht(Veranstaltung v) {
        super(v);
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Kann nicht von Gelöscht zu Abgeschlossen wechseln");
    }

    @Override
    public void liveSetzen() {
        throw new IllegalStateException("Kann nicht von Gelöscht zu Live wechseln");

    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Kann nicht von Gelöscht zu Ausstehend wechseln");

    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Kann nicht von Gelöscht zu Stattfindend wechseln");

    }

    @Override
    public void geloeschtSetzen() {
        // befindet sich in diesem Zustand

    }
}