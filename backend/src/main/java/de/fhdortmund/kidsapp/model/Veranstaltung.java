package de.fhdortmund.kidsapp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import de.fhdortmund.kidsapp.model.Fabrik.Bewertung;
import de.fhdortmund.kidsapp.model.Fabrik.RegistrierterNutzer;
import de.fhdortmund.kidsapp.model.Kompositum.Umfrage;
import de.fhdortmund.kidsapp.model.Zustaende.Ausstehend;
import de.fhdortmund.kidsapp.model.Zustaende.Status;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;


@Entity
@Data
public class Veranstaltung { 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String titel;
    @Column(nullable = false, length = 500)
    private String beschreibung;
    @Column(nullable = false)
    private double preis;
    @Column(nullable = false)
    private AnschriftT anschrift;
    @Column(nullable = false)
    private String kategorie;
    @Column(nullable = false)
    private String bildUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Zahlungsmoeglichkeiten zahlungsmoeglichkeit;

    public enum Zahlungsmoeglichkeiten {
        BAR, KREDITKARTE, PAYPAL, UEBERWEISUNG
    }

    @Column(nullable = false)
    private String veranstalter;
    @Column(nullable = false)
    private String veranstalterEmail;
    @Column(nullable = false)
    private String veranstalterTelefon;

    @OneToMany(mappedBy = "veranstaltung", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Veranstaltung> weitereVeranstaltungen = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "registrierter_nutzer_veranstaltung",
        joinColumns = @JoinColumn(name = "veranstaltung_id"),
        inverseJoinColumns = @JoinColumn(name = "registrierter_nutzer_id")
    )
    private List<RegistrierterNutzer> teilnehmer = new ArrayList<>();

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
    public void storniertSetzen() {
        aktuellerstatus.storniertSetzen();
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