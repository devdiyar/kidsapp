package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Konkreter Status für verfügbare Umfragen
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class UmfrageVerfuegbar extends Status {
    @OneToOne
    private Umfrage umfrage;

    @Override
    public void umfrageVerfuegbarSetzen() {
        // Bereits in diesem Status
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        BewertungVerfuegbar neuerStatus = new BewertungVerfuegbar();
        umfrage.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void ausstehenSetzen() {
        Ausstehend neuerStatus = new Ausstehend();
        umfrage.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void liveSetzen() {
        Live neuerStatus = new Live();
        umfrage.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void stattfindendSetzen() {
        Stattfindend neuerStatus = new Stattfindend();
        umfrage.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void abgeschlossenSetzen() {
        Abgeschlossen neuerStatus = new Abgeschlossen();
        umfrage.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void geloeschtSetzen() {
        Geloescht neuerStatus = new Geloescht();
        umfrage.getAktivitaet().setStatus(neuerStatus);
    }


}