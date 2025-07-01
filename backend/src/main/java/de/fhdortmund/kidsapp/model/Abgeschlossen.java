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
    @OneToOne
    private Aktivitaet aktivitaet;

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Kann nicht von Abgeschlossen zu UmfrageVerfuegbar wechseln");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Kann nicht von Abgeschlossen zu BewertungVerfuegbar wechseln");
    }

    @Override
    public void ausstehenSetzen() {
        throw new IllegalStateException("Kann nicht von Abgeschlossen zu Ausstehend wechseln");
    }

    @Override
    public void liveSetzen() {
        throw new IllegalStateException("Kann nicht von Abgeschlossen zu Live wechseln");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Kann nicht von Abgeschlossen zu Stattfindend wechseln");
    }

    @Override
    public void abgeschlossenSetzen() {
        // Bereits in diesem Status
    }

    @Override
    public void geloeschtSetzen() {
        Geloescht neuerStatus = new Geloescht();
        aktivitaet.setStatus(neuerStatus);
    }
}