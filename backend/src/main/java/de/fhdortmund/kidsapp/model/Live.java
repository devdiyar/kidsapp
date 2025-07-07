package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity representing the live status.
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Live extends Status {
    public Live(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Live() {

    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Stattfindend gesetzt werden, da er bereits Live ist.");
    }

    @Override
    public void ausstehendSetzen() {
        throw new IllegalStateException("Status kann nicht auf Ausstehend gesetzt werden, da er bereits Live ist.");
    }

    @Override
    public void liveSetzen() {
        System.out.println("Status bereits auf Live gesetzt.");

    }

    @Override
    public void abgeschlossenSetzen() {
        System.out.println("Status wird auf Abgeschlossen gesetzt.");
        veranstaltung.setAktuellerstatus(new Abgeschlossen(veranstaltung));
    }

    @Override
    public void geloeschtSetzen() {
        System.out.println("Status wird auf Geloescht gesetzt.");
        veranstaltung.setAktuellerstatus(new Geloescht(veranstaltung));
    }

    @Override
    public String toString() {
        return "Live";
    }
}