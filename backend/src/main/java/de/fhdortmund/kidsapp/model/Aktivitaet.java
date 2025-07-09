package de.fhdortmund.kidsapp.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

/**
 * Entity representing an activity in the system.
 */
@Entity
@Data 
public class Aktivitaet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "teilnehmer_id")
    private RegistrierterNutzer teilnehmer;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "status_id")
    private Status status;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "umfrage_id")
    private Umfrage umfrage;
    
    @Embedded
    private TerminT termin;

    public void setStatus(Status neuerStatus) {
        if (this.status != null) {
            // Alte Referenz entfernen
            this.status = null;
        }
        this.status = neuerStatus;
        if (neuerStatus != null) {
            // Neue bidirektionale Beziehung aufbauen
            if (neuerStatus instanceof UmfrageVerfuegbar) {
                ((UmfrageVerfuegbar) neuerStatus).setUmfrage(this.umfrage);
            } else if (neuerStatus instanceof BewertungVerfuegbar) {
                // Bewertung muss separat gesetzt werden
            } else if (neuerStatus instanceof Live) {
                ((Live) neuerStatus).setAktivitaet(this);
            }
        }
    }
}