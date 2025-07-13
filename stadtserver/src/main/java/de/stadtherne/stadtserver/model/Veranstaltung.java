package de.stadtherne.stadtserver.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Veranstaltung {

    private Long id;

    private String titel;
    private String beschreibung;

    private RegistrierterNutzer teilnehmer;

    private Beamter beamter;

    private Status aktuellerstatus;

    private Umfrage umfrage;

    private List<Bewertung> bewertungen;

    private TerminT termin;

    public Veranstaltung() {
        bewertungen = new ArrayList<>();
        this.aktuellerstatus = new Ausstehend(this);
    }

    public Bewertung bewertungErstellen(int steranzahl, String kommentar, RegistrierterNutzer bewerter) {
        Bewertung bewertung = new Bewertung();
        bewertung.setSteranzahl(steranzahl);
        bewertung.setKommentar(kommentar);
        bewertung.setBewerter(bewerter);
        bewertung.setVeranstaltung(this);
        this.bewertungen.add(bewertung);
        return bewertung;
    }

    public void setAktuellerstatus(Status aktuellerstatus) {
        this.aktuellerstatus = aktuellerstatus;
        System.out.println("Status gesetzt: " + aktuellerstatus);
    }

    public void ausstehendSetzen() {
        aktuellerstatus.ausstehendSetzen();
    }

    public void stattfindendSetzen() {
        aktuellerstatus.stattfindendSetzen();
    }

    public void liveSetzen(Bewertung bewertung) {
        aktuellerstatus.liveSetzen();
    }

    public void abgeschlossenSetzen() {
        aktuellerstatus.abgeschlossenSetzen();
    }

    public void geloeschtSetzen() {
        aktuellerstatus.geloeschtSetzen();
    }
}
