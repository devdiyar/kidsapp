package de.fhdortmund.kidsapp.model.Zustaende;

import de.fhdortmund.kidsapp.model.Veranstaltung;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity representing the completed status.
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Stroniert extends Status {

    public Stroniert(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Stroniert() {
    }

    @Override
    public void erstelltSetzen() {
        throw new IllegalStateException("Status kann nicht auf Erstellt gesetzt werden, da er bereits Stroniert ist.");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits Stroniert ist.");
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Stroniert ist.");
    }

    @Override
    public void trendingSetzen(int anzahlTeilnehmer) {
        throw new IllegalStateException("Status kann nicht auf Trending gesetzt werden, da er bereits Stroniert ist.");
    }

    @Override
    public void inVorbereitungSetzen() {
        throw new IllegalStateException("Status kann nicht auf InVorbereitung gesetzt werden, da er bereits Stroniert ist.");
    }

    @Override
    public void storniertSetzen() {
        System.out.println("Status bereits auf Stroniert gesetzt.");
    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        throw new IllegalStateException("Status kann nicht auf Stroniert gesetzt werden, da er bereits Stroniert ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf Abgeschlossen gesetzt werden, da er bereits Stroniert ist.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf BewertungVerfuegbar gesetzt werden, da er bereits Stroniert ist.");
    }

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf UmfrageVerfuegbar gesetzt werden, da er bereits Stroniert ist.");
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