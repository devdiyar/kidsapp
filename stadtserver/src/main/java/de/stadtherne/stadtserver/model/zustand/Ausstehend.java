package de.stadtherne.stadtserver.model.zustand;

import de.stadtherne.stadtserver.model.fabrik.Veranstaltung;
import jakarta.persistence.Entity;

@Entity
public class Ausstehend extends Status {
    public Ausstehend() {
    }

    public Ausstehend(Veranstaltung v) {
        super(v);
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Kann nicht von Ausstehend zu Abgeschlossen wechseln");
    }

    @Override
    public void liveSetzen() {
        veranstaltung.setStatus(new Live(veranstaltung));

    }

    @Override
    public void ausstehendSetzen() {
        // befindet sich in dem Zustand

    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Kann nicht von Ausstehend zu Stattfindend wechseln");

    }

    @Override
    public void geloeschtSetzen() {
        veranstaltung.setStatus(new Geloescht(veranstaltung));

    }
}