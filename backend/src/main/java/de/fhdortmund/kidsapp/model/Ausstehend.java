package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
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
    public void ausstehenSetzen() {
    }

    @Override
    public void liveSetzen() {
        Live neuerStatus = new Live();
        veranstaltung.setStatus(neuerStatus);
    }

    @Override
    public void stattfindendSetzen() {
        Stattfindend neuerStatus = new Stattfindend();
        veranstaltung.setStatus(neuerStatus);
    }

    @Override
    public void abgeschlossenSetzen() {
        Abgeschlossen neuerStatus = new Abgeschlossen();
        veranstaltung.setStatus(neuerStatus);
    }

    @Override
    public void geloeschtSetzen() {
        Geloescht neuerStatus = new Geloescht();
        veranstaltung.setStatus(neuerStatus);
    }
}