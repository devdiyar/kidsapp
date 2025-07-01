package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class Beamter extends Nutzer {
    public Aktivitaet aktivitaetErstellen(String titel, String beschreibung, TerminT termin) {
        return new Aktivitaet();
    }
    public Umfrage umfrageErstellen(String titel, String beschreibung) {
        return new Umfrage();
    }
    public void liveSetzen(Aktivitaet a) { a.liveSetzen(); }
    public void abgeschlossenSetzen(Aktivitaet a) { a.abgeschlossenSetzen(); }
    public void ausstehendSetzen(Aktivitaet a) { a.ausstehendSetzen(); }
    public void geloeschtSetzen(Aktivitaet a) { a.geloeschtSetzen(); }
    public void stattfindendSetzen(Aktivitaet a) { a.stattfindendSetzen(); }
    public void bewertungVerfuegbarSetzen(Aktivitaet a) { a.bewertungVerfuegbarSetzen(); }
    public void umfrageVerfuegbarSetzen(Aktivitaet a) { a.umfrageVerfuegbarSetzen(); }
    public void trendingSetzen(Aktivitaet a) { a.trendingSetzen(); }
}