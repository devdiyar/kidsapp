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
public class InVorbereitung extends Status {

    public InVorbereitung(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public InVorbereitung() {
    }

    @Override
    public void erstelltSetzen() {
        throw new IllegalStateException("Status kann nicht auf Erstellt gesetzt werden, da er bereits InVorbereitung ist.");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits InVorbereitung ist.");
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits InVorbereitung ist.");
    }

    @Override
    public void trendingSetzen(int anzahlTeilnehmer) {
        throw new IllegalStateException("Status kann nicht auf Trending gesetzt werden, da er bereits InVorbereitung ist.");
    }

    @Override
    public void inVorbereitungSetzen() {
        System.out.println("Status InVorbereitung auf Erstellt gesetzt.");
    }

    @Override
    public void storniertSetzen() {
        System.out.println("Status wird auf Stroniert gesetzt.");
        veranstaltung.setAktuellerstatus(new Stroniert(veranstaltung));    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        if (teilnehmerAnzahl ==0) {
            throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da keine Teilnehmer vorhanden sind.");
        } else {
            System.out.println("Status wird auf Live gesetzt.");
            veranstaltung.setAktuellerstatus(new Live(veranstaltung));
        }
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf abgeschlossen gesetzt werden, da er bereits InVorbereitung ist.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf BewertungVerfuegbar gesetzt werden, da er bereits InVorbereitung ist.");
    }

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Status kann nicht auf UmfrageVerfuegbar gesetzt werden, da er bereits InVorbereitung ist.");
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