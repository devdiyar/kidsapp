package de.stadtherne.stadtserver.model.fabrik;

import de.stadtherne.stadtserver.model.Bewertung;
import de.stadtherne.stadtserver.model.Umfrage;
import de.stadtherne.stadtserver.model.zustand.Status;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Veranstaltung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titel;
    private String beschreibung;

    @ManyToOne
    @JoinColumn(name = "beamter_id")
    private Beamter beamter;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Bewertung> bewertungen = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    private Umfrage umfrage;

    @ManyToOne(cascade = CascadeType.ALL)
    private Status status;


    public Long getId() { return id; }

    public String getTitel() { return titel; }
    public void setTitel(String titel) { this.titel = titel; }

    public String getBeschreibung() { return beschreibung; }
    public void setBeschreibung(String beschreibung) { this.beschreibung = beschreibung; }

    public Beamter getBeamter() { return beamter; }
    public void setBeamter(Beamter beamter) { this.beamter = beamter; }

    public List<Bewertung> getBewertungen() { return bewertungen; }
    public void addBewertung(Bewertung bewertung) { bewertungen.add(bewertung); }
    public void removeBewertung(Bewertung bewertung) { bewertungen.remove(bewertung); }

    public Umfrage getUmfrage() { return umfrage; }
    public void setUmfrage(Umfrage umfrage) { this.umfrage = umfrage; }
    public Umfrage umfrageErstellen() {
        if (this.umfrage == null) {
            this.umfrage = new Umfrage();
        }
        return this.umfrage;
    }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}