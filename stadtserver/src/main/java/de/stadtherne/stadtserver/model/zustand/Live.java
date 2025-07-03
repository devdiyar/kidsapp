package de.stadtherne.stadtserver.model.zustand;

import de.stadtherne.stadtserver.model.fabrik.Veranstaltung;
import jakarta.persistence.Entity;


@Entity
public class Live extends Status {
    public Live() {
    }

    public Live(Veranstaltung v) {
        super(v);
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Kann nicht von Live zu Abgeschlossen wechseln");
    }

    @Override
    public void liveSetzen() {
        // befindet sich in diesem Zustand

    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Kann nicht von Live zu Ausstehend wechseln");

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