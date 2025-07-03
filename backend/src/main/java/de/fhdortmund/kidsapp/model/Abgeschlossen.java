package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
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
    public void ausstehenSetzen() {
        throw new IllegalStateException("...");
    }

    @Override
    public void liveSetzen() {
        throw new IllegalStateException("...");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("...");
    }

    @Override
    public void abgeschlossenSetzen() {
    }

    @Override
    public void geloeschtSetzen() {
        Geloescht neuerStatus = new Geloescht();
        veranstaltung.setStatus(neuerStatus);
    }
}