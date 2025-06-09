package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * Entity representing the taking place status.
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Stattfindend extends Status {
    public Stattfindend(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }
    public Stattfindend() {}

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Kann nicht von Stattfindend zu UmfrageVerfuegbar wechseln");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Kann nicht von Stattfindend zu BewertungVerfuegbar wechseln");
    }

    @Override
    public void ausstehenSetzen() {
        throw new IllegalStateException("Kann nicht von Stattfindend zu Ausstehend wechseln");
    }

    @Override
    public void liveSetzen() {
        Live neuerStatus = new Live();
        veranstaltung.setStatus(neuerStatus);
    }

    @Override
    public void stattfindendSetzen() {
        // Bereits in diesem Status
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