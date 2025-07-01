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
    @OneToOne
    private Aktivitaet aktivitaet;

    @Override
    public void umfrageVerfuegbarSetzen() {
        UmfrageVerfuegbar neuerStatus = new UmfrageVerfuegbar();
        aktivitaet.setStatus(neuerStatus);
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        BewertungVerfuegbar neuerStatus = new BewertungVerfuegbar();
        aktivitaet.setStatus(neuerStatus);
    }

    @Override
    public void ausstehenSetzen() {
        // Bereits in diesem Status
    }

    @Override
    public void liveSetzen() {
        Live neuerStatus = new Live();
        aktivitaet.setStatus(neuerStatus);
    }

    @Override
    public void stattfindendSetzen() {
        Stattfindend neuerStatus = new Stattfindend();
        aktivitaet.setStatus(neuerStatus);
    }

    @Override
    public void abgeschlossenSetzen() {
        Abgeschlossen neuerStatus = new Abgeschlossen();
        aktivitaet.setStatus(neuerStatus);
    }

    @Override
    public void geloeschtSetzen() {
        Geloescht neuerStatus = new Geloescht();
        aktivitaet.setStatus(neuerStatus);
    }
}