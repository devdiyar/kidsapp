package de.fhdortmund.kidsapp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    private String titel;
    private String beschreibung;
    private double preis;
    private AnschriftT anschrift;

    @ManyToOne
    @JoinColumn(name = "teilnehmer_id")
    private RegistrierterNutzer teilnehmer;

    @OneToMany(mappedBy = "veranstaltung", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Bewertung> bewertungen = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "status_id")
    @JsonManagedReference
    private Status aktuellerstatus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "umfrage_id")
    @JsonManagedReference
    private Umfrage umfrage;
    
    @Embedded
    private TerminT termin;

    public Veranstaltung() {
        bewertungen = new ArrayList<>();
        setAktuellerstatus(new Ausstehend(this));
    }

    public Bewertung bewertungErstellen(int steranzahl, String kommentar, RegistrierterNutzer bewerter) {
        Bewertung bewertung = new Bewertung();
        bewertung.setSteranzahl(steranzahl);
        bewertung.setKommentar(kommentar);
        bewertung.setBewerter(bewerter);
        bewertung.setVeranstaltung(this);
        this.bewertungen.add(bewertung);
        return bewertung;
    }

    public void setAktuellerstatus(Status aktuellerstatus) {
        this.aktuellerstatus = aktuellerstatus;
        System.out.println("Status gesetzt: " + aktuellerstatus);
    }

    public void ausstehendSetzen() {
        aktuellerstatus.ausstehendSetzen();
    }
    public void stattfindendSetzen() {
        aktuellerstatus.stattfindendSetzen();
    }
    public void liveSetzen(Bewertung bewertung) {
        aktuellerstatus.liveSetzen();
    }
    public void abgeschlossenSetzen() {
        aktuellerstatus.abgeschlossenSetzen();
    }
    public void geloeschtSetzen() {
        aktuellerstatus.geloeschtSetzen();
    }
}