package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Stattfindend extends Status {
    public Stattfindend(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }
    public Stattfindend() {}

    @Override
    public void erstelltSetzen() {

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
    public void trendingSetzen(int anzahlTeilnehmer) {
        throw new IllegalStateException("Status kann nicht auf Trending gesetzt werden, da er bereits Stattfindend ist.");
    }

    @Override
    public void inVorbereitungSetzen() {
        throw new IllegalStateException("Status kann nicht auf InVorbereitung gesetzt werden, da er bereits Stattfindend ist.");
    }

    @Override
    public void stroniertSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stroniert gesetzt werden, da er bereits Stattfindend ist.");
    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da er bereits Stattfindend ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf Abgeschlossen gesetzt werden, da er bereits Stattfindend ist.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf BewertungVerfuegbar gesetzt werden, da er bereits Stattfindend ist.");
    }

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf UmfrageVerfuegbar gesetzt werden, da er bereits Stattfindend ist.");
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