package de.fhdortmund.kidsapp.model.Zustaende;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.fhdortmund.kidsapp.model.Veranstaltung;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToOne;
import lombok.Data;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public abstract class Status {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(mappedBy = "aktuellerstatus")
    @JsonBackReference
    protected Veranstaltung veranstaltung;


    public Status(Veranstaltung veranstaltung) {
        this.veranstaltung = veranstaltung;
    }

    public Status() {}

    public abstract void erstelltSetzen();
    public abstract void stattfindendSetzen();
    public abstract void ausstehendSetzen();
    public abstract void trendingSetzen(int teilnehmenranzahl);
    public abstract void inVorbereitungSetzen();
    public abstract void storniertSetzen();
    public abstract void liveSetzen(int teilnehmerAnzahl);
    public abstract void abgeschlossenSetzen();
    public abstract void bewertungVerfuegbarSetzen();
    public abstract void umfrageVerfuegbarSetzen();
    public abstract void geloeschtSetzen();

}