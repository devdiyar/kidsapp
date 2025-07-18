package de.fhdortmund.kidsapp.model.Zustaende;

import de.fhdortmund.kidsapp.model.Veranstaltung;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Geloescht extends Status {

    public Geloescht(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Geloescht() {

    }

    @Override
    public void erstelltSetzen() {

    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits Geloescht ist.");
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Geloescht ist.");
    }

    @Override
    public void trendingSetzen(int anzahlTeilnehmer) {

    }

    @Override
    public void inVorbereitungSetzen() {

    }

    @Override
    public void storniertSetzen() {

    }

    @Override
    public void liveSetzen(int teilnehmerAnzahl) {
        throw new IllegalStateException("Status kann nicht auf Live gesetzt werden, da er bereits Geloescht ist.");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Status kann nicht auf Abgeschlossen gesetzt werden, da er bereits Geloescht ist.");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {

    }

    @Override
    public void umfrageVerfuegbarSetzen() {

    }

    @Override
    public void geloeschtSetzen() {
        System.out.println("Status bereits auf Geloescht gesetzt.");
    }

    @Override
    public String toString() {
        return "Geloescht";
    }
}
