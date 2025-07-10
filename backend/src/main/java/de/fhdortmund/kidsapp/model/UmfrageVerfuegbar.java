package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity representing the completed status.
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class UmfrageVerfuegbar extends Status {

    public UmfrageVerfuegbar(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public UmfrageVerfuegbar() {
    }

    @Override
    public void erstelltSetzen() {
        throw new IllegalStateException("Status kann nicht auf Erstellt gesetzt werden, da er bereits UmfrageVerfuegbar ist.");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits UmfrageVerfuegbar ist.");
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits UmfrageVerfuegbar ist.");
    }

    @Override
    public void trendingSetzen(int anzahlTeilnehmer) {
        throw new IllegalStateException("Status kann nicht auf Trending gesetzt werden, da er bereits UmfrageVerfuegbar ist.");

    }

    @Override
    public void inVorbereitungSetzen() {
        throw new IllegalStateException("Status kann nicht auf InVorbereitung gesetzt werden, da er bereits UmfrageVerfuegbar ist.");

    }

    @Override
    public void stroniertSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stroniert gesetzt werden, da er bereits UmfrageVerfuegbar ist.");

    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da er bereits UmfrageVerfuegbar ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf abgeschlossen gesetzt werden, da er bereits UmfrageVerfuegbar ist.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf BewertungVerfuegbar gesetzt werden, da er bereits UmfrageVerfuegbar ist.");

    }

    @Override
    public void umfrageVerfuegbarSetzen() {
        System.out.println("Status bereits auf UmfrageVerfuegbar gesetzt.");
    }

    @Override
    public void geloeschtSetzen() {
        System.out.println("Status wird auf Geloescht gesetzt.");
        veranstaltung.setAktuellerstatus(new Geloescht(veranstaltung));
    }

    @Override
    public String toString() {
        return "Erstellt";
    }
}