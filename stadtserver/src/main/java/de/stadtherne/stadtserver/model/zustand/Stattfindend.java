package de.stadtherne.stadtserver.model.zustand;

import de.stadtherne.stadtserver.model.fabrik.Veranstaltung;
import jakarta.persistence.Entity;

@Entity
public class Stattfindend extends Status {
    public Stattfindend(Veranstaltung v){
        super(v);
    }

    @Override
    public void abgeschlossenSetzen() {
        veranstaltung.setStatus(new Abgeschlossen(veranstaltung));
    }

    @Override
    public void liveSetzen() {
        throw new IllegalStateException("Kann nicht von Stattfindend zu Live wechseln");

    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Kann nicht von Stattfindend zu Ausstehend wechseln");

    }

    @Override
    public void stattfindendSetzen() {
        // befindet sich in diesem Zustand

    }

    @Override
    public void geloeschtSetzen() {
        veranstaltung.setStatus(new Geloescht(veranstaltung));

    }
}