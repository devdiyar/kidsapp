package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class Beamter extends Nutzer {
    public Veranstaltung aktivitaetErstellen(String titel, String beschreibung, TerminT termin) {
        return new Veranstaltung();
    }
    public Umfrage umfrageErstellen(String titel, String beschreibung) {
        return new Umfrage();
    }
    public void liveSetzen(Veranstaltung a) { a.liveSetzen(); }
    public void abgeschlossenSetzen(Veranstaltung a) { a.abgeschlossenSetzen(); }
    public void ausstehendSetzen(Veranstaltung a) { a.ausstehendSetzen(); }
    public void geloeschtSetzen(Veranstaltung a) { a.geloeschtSetzen(); }
    public void stattfindendSetzen(Veranstaltung a) { a.stattfindendSetzen(); }
    public void bewertungVerfuegbarSetzen(Veranstaltung a) { a.bewertungVerfuegbarSetzen(); }
    public void umfrageVerfuegbarSetzen(Veranstaltung a) { a.umfrageVerfuegbarSetzen(); }
    public void trendingSetzen(Veranstaltung a) { a.trendingSetzen(); }
}