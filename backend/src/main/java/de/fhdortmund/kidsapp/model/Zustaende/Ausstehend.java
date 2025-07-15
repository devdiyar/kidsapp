package de.fhdortmund.kidsapp.model.Zustaende;

import de.fhdortmund.kidsapp.model.Veranstaltung;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity representing the pending status.
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Ausstehend extends Status {

    public Ausstehend(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Ausstehend() {

    }

    @Override
    public void erstelltSetzen() {
        throw new IllegalStateException("Status kann nicht auf Erstellt gesetzt werden, da er bereits ausstehend ist.");
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
    public void trendingSetzen(int teilnehmenranzahl) {
        if (teilnehmenranzahl>=50) {
            System.out.println("Status wird auf Trending gesetzt.");
            veranstaltung.setAktuellerstatus(new Trending(veranstaltung));
        } else {
            throw new IllegalStateException("Status kann nicht auf Trending gesetzt werden, da die Teilnehmeranzahl unter 50 liegt.");
        }
    }

    @Override
    public void inVorbereitungSetzen() {
        System.out.println("Status wird auf InVorbereitung gesetzt.");
        veranstaltung.setAktuellerstatus(new InVorbereitung(veranstaltung));
    }

    @Override
    public void storniertSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits ausstehend ist.");

    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits ausstehend ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf Abgeschlossen gesetzt werden, da er bereits ausstehend ist.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf BewertungVerfuegbar gesetzt werden, da er bereits ausstehend ist.");
    }

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf UmfrageVerfuegbar gesetzt werden, da er bereits ausstehend ist.");
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