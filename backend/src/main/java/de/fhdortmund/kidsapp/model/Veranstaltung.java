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
import lombok.Getter;


@Entity
@Getter
    @Data
public class Veranstaltung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "teilnehmer_id")
    private RegistrierterNutzer teilnehmer;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "status_id")
    private Status aktuellerstatus;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "umfrage_id")
    private Umfrage umfrage;
    
    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "bewertung_id")
    private Bewertung bewertung;
    
    @Embedded
    private TerminT termin;    

    public Veranstaltung() {
        initializeStatus();
    }

    private void initializeStatus() {
        Status status = new Ausstehend();
        status.setVeranstaltung(this);
        this.aktuellerstatus = status;
    }

    public void setStatus(Status neuerStatus) {
        neuerStatus.setVeranstaltung(this);
        this.aktuellerstatus = neuerStatus;
    }
}