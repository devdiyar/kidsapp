package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity representing the pending status.
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Trending extends Status {

    public Trending(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Trending() {

    }

    @Override
    public void erstelltSetzen() {
        throw new IllegalStateException("Status kann nicht auf Erstellt gesetzt werden, da er bereits Trending ist.");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits Trending ist.");
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Trending ist.");
    }

    @Override
    public void trendingSetzen(int anzahlTeilnehmer) {
            System.out.println("Status bereits auf Trending gesetzt.");
    }

    @Override
    public void inVorbereitungSetzen() {
        System.out.println("Status wird auf InVorbereitung gesetzt.");
        veranstaltung.setAktuellerstatus(new InVorbereitung(veranstaltung));    }

    @Override
    public void stroniertSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stroniert gesetzt werden, da er bereits Trending ist.");
    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da er bereits Trending ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf Abgeschlossen gesetzt werden, da er bereits Trending ist.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf BewertungVerfuegbar gesetzt werden, da er bereits Trending ist.");
    }

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf UmfrageVerfuegbar gesetzt werden, da er bereits Trending ist.");
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