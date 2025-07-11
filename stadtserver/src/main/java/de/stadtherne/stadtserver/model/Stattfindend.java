package de.stadtherne.stadtserver.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Stattfindend extends Status {

    public Stattfindend(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Stattfindend() {
    }

    @Override
    public void stattfindendSetzen() {
        System.out.println("Status bereits auf Stattfindend gesetzt.");
    }

    @Override
    public void ausstehendSetzen() {
        System.out.println("Status wird auf Ausstehend gesetzt.");
        veranstaltung.setAktuellerstatus(new Ausstehend(veranstaltung));
    }

    @Override
    public void liveSetzen() {
        throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da er bereits Stattfindend ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf Abgeschlossen gesetzt werden, da er bereits Stattfindend ist.");
    }

    @Override
    public void geloeschtSetzen() {
        System.out.println("Status wird auf Geloescht gesetzt.");
        veranstaltung.setAktuellerstatus(new Geloescht(veranstaltung));
    }

    @Override
    public String toString() {
        return "Stattfindend";
    }
}
