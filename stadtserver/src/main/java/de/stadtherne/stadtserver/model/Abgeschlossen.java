package de.stadtherne.stadtserver.model;

public class Abgeschlossen extends Status {

    public Abgeschlossen(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Abgeschlossen() {

    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits abgeschlossen ist.");
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits abgeschlossen ist.");
    }

    @Override
    public void liveSetzen() {
        throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da er bereits abgeschlossen ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        System.out.println("Status bereits auf Abgeschlossen gesetzt.");
    }

    @Override
    public void geloeschtSetzen() {
        System.out.println("Status wird auf Geloescht gesetzt.");
        veranstaltung.setAktuellerstatus(new Geloescht(veranstaltung));
    }

    @Override
    public String toString() {
        return "Abgeschlossen";
    }
}
