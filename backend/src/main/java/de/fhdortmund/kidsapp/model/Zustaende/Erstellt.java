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
public class Erstellt extends Status {

    public Erstellt(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Erstellt() {
    }

    @Override
    public void erstelltSetzen() {
        System.out.println("Status bereits auf Erstellt gesetzt.");
    }

    @Override
    public void stattfindendSetzen() {
        System.out.println("Status wird auf Stattfindend gesetzt.");
        veranstaltung.setAktuellerstatus(new Stattfindend(veranstaltung));
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public void trendingSetzen(int anzahlTeilnehmer) {
        throw new IllegalStateException("Status kann nicht auf Trending gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public void inVorbereitungSetzen() {
        throw new IllegalStateException("Status kann nicht auf InVorbereitung gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public void storniertSetzen() {
        throw new IllegalStateException("Status kann nicht auf Storniert gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf abgeschlossen gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf BewertungVerfuegbar gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf umfrageVerfuegbar gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public void geloeschtSetzen() {
        throw new IllegalStateException("Status kann nicht auf geloescht gesetzt werden, da er bereits Erstellt ist.");
    }

    @Override
    public String toString() {
        return "Erstellt";
    }
}