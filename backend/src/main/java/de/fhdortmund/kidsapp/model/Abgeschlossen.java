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
public class Abgeschlossen extends Status {

    public Abgeschlossen(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Abgeschlossen() {

    }

    @Override
    public void erstelltSetzen() {
        throw new IllegalStateException("Status kann nicht auf Erstellt gesetzt werden, da er bereits Abgeschlossen ist.");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits Abgeschlossen ist.");
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Abgeschlossen ist.");
    }

    @Override
    public void trendingSetzen(int anzahlTeilnehmer) {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Abgeschlossen ist.");
    }

    @Override
    public void inVorbereitungSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Abgeschlossen ist.");
    }

    @Override
    public void stroniertSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Abgeschlossen ist.");
    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da er bereits Abgeschlossen ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        System.out.println("Status bereits auf Abgeschlossen gesetzt.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        System.out.println("Status wird auf BewertungVerfuegbar gesetzt.");
        veranstaltung.setAktuellerstatus(new BewertungVerfuegbar(veranstaltung));
    }

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Abgeschlossen ist.");
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