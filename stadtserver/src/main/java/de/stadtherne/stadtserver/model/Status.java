package de.stadtherne.stadtserver.model;

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

    @OneToOne
    protected Veranstaltung veranstaltung;

    public Status(Veranstaltung veranstaltung) {
        this.veranstaltung = veranstaltung;
    }

    public Status() {}

    public abstract void stattfindendSetzen();
    public abstract void ausstehendSetzen();
    public abstract void liveSetzen();
    public abstract void abgeschlossenSetzen();
    public abstract void geloeschtSetzen();
}