package de.stadtherne.stadtserver.model.zustand;

import de.stadtherne.stadtserver.model.fabrik.Veranstaltung;
import jakarta.persistence.Entity;


@Entity
public class Live extends Status {
    public Live(Veranstaltung v){
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