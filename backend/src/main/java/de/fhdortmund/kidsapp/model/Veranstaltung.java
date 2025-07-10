package de.fhdortmund.kidsapp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
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

    @ManyToMany
    @JoinTable(
        name = "registrierter_nutzer_veranstaltung",
        joinColumns = @JoinColumn(name = "veranstaltung_id"),
        inverseJoinColumns = @JoinColumn(name = "registrierter_nutzer_id")
    )
    private List<RegistrierterNutzer> teilnehmer;

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

    public void erstelltSetzen() {
        aktuellerstatus.erstelltSetzen();
    }
    public void stattfindendSetzen() {
        aktuellerstatus.stattfindendSetzen();
    }
    public void ausstehendSetzen() {
        aktuellerstatus.ausstehendSetzen();
    }
    public void trendingSetzen() {
        aktuellerstatus.trendingSetzen(this.getTeilnehmeranzahl());
    }

    private int getTeilnehmeranzahl() {
        return teilnehmer.size();
    }

    public void inVorbereitungSetzen() {
        aktuellerstatus.inVorbereitungSetzen();
    }
    public void stroniertSetzen() {
        aktuellerstatus.stroniertSetzen();
    }
    public void liveSetzen(Bewertung bewertung) {
        aktuellerstatus.liveSetzen(getTeilnehmeranzahl());
    }
    public void abgeschlossenSetzen() {
        aktuellerstatus.abgeschlossenSetzen();
    }
    public void bewertungVerfuegbarSetzen() {
        aktuellerstatus.bewertungVerfuegbarSetzen();
    }
    public void umfrageVerfuegbarSetzen() {
        aktuellerstatus.umfrageVerfuegbarSetzen();
    }
    public void geloeschtSetzen() {
        aktuellerstatus.geloeschtSetzen();
    }
}