package de.stadtherne.stadtserver.model;

import java.util.ArrayList;
import java.util.List;

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
    
    @ManyToOne
    @JoinColumn(name = "teilnehmer_id")
    private RegistrierterNutzer teilnehmer;
    
    @ManyToOne
    @JoinColumn(name = "beamter_id")
    private Beamter beamter;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "status_id")
    private Status aktuellerstatus;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "umfrage_id")
    private Umfrage umfrage;
    
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "bewertung_id")
    private List<Bewertung> bewertungen;
    
    @Embedded
    private TerminT termin;

    public Veranstaltung() {
        bewertungen = new ArrayList<>();
        this.aktuellerstatus = new Ausstehend(this);
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