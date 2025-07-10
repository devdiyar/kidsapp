package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Konkreter Status für verfügbare Bewertungen
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class BewertungVerfuegbar extends Status {
    @OneToOne
    private Bewertung bewertung;

    @Override
    public void umfrageVerfuegbarSetzen() {
        UmfrageVerfuegbar neuerStatus = new UmfrageVerfuegbar();
        bewertung.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void bewertungVerfuegbarSetzen() {
        // Bereits in diesem Status
    }

    @Override
    public void ausstehenSetzen() {
        Ausstehend neuerStatus = new Ausstehend();
        bewertung.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void liveSetzen() {
        Live neuerStatus = new Live();
        bewertung.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void stattfindendSetzen() {
        Stattfindend neuerStatus = new Stattfindend();
        bewertung.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void abgeschlossenSetzen() {
        Abgeschlossen neuerStatus = new Abgeschlossen();
        bewertung.getAktivitaet().setStatus(neuerStatus);
    }

    @Override
    public void geloeschtSetzen() {
        Geloescht neuerStatus = new Geloescht();
        bewertung.getAktivitaet().setStatus(neuerStatus);
    }
}