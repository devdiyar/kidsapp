package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Konkreter Status für gelöschte Aktivitäten
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Geloescht extends Status {
    @OneToOne
    private Aktivitaet aktivitaet;

    @Override
    public void umfrageVerfuegbarSetzen() {
        throw new IllegalStateException("Kann nicht von Geloescht zu UmfrageVerfuegbar wechseln");
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        throw new IllegalStateException("Kann nicht von Geloescht zu BewertungVerfuegbar wechseln");
    }

    @Override
    public void ausstehenSetzen() {
        throw new IllegalStateException("Kann nicht von Geloescht zu Ausstehend wechseln");
    }

    @Override
    public void liveSetzen() {
        throw new IllegalStateException("Kann nicht von Geloescht zu Live wechseln");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("Kann nicht von Geloescht zu Stattfindend wechseln");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("Kann nicht von Geloescht zu Abgeschlossen wechseln");
    }

    @Override
    public void geloeschtSetzen() {
        // Bereits in diesem Status
    }
}
