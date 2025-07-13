package de.stadtherne.stadtserver.model;

public class Ausstehend extends Status {

    public Ausstehend(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Ausstehend() {

    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits ausstehend ist.");
    }

    @Override
    public void ausstehendSetzen() {
        System.out.println("Status bereits auf ausstehend gesetzt.");
    }

    @Override
    public void liveSetzen() {
        System.out.println("Status wird auf Live gesetzt.");
        veranstaltung.setAktuellerstatus(new Live(veranstaltung));
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf Abgeschlossen gesetzt werden, da er bereits ausstehend ist.");
    }

    @Override
    public void geloeschtSetzen() {
        System.out.println("Status wird auf Geloescht gesetzt.");
        veranstaltung.setAktuellerstatus(new Geloescht(veranstaltung));
    }

    @Override
    public String toString() {
        return "Ausstehend";
    }
}
